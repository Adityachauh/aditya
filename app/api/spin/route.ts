import { NextRequest, NextResponse } from 'next/server';
import { selectPrize, decrementPrize, generateCode } from '@/lib/prizes';
import { hasUserSpun, getUsers } from '@/lib/users';
import { sendPrizeEmail } from '@/lib/email';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Verify user has submitted email
    if (!hasUserSpun(email)) {
      return NextResponse.json(
        { error: 'Please submit your email first' },
        { status: 400 }
      );
    }

    // Select a prize
    const prize = selectPrize();

    if (!prize) {
      return NextResponse.json(
        { error: 'No prizes available at this time' },
        { status: 400 }
      );
    }

    // Decrement prize quantity
    decrementPrize(prize.id);

    // Generate code for digital prizes
    let prizeCode: string | undefined;
    if (prize.type === 'digital' && prize.name !== 'Try Again') {
      prizeCode = generateCode(prize.id);
    }

    // Update user record with prize
    const users = getUsers();
    const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (userIndex !== -1) {
      users[userIndex].prize = prize.name;
      users[userIndex].prizeId = prize.id;
      const DATA_DIR = path.join(process.cwd(), 'data');
      const USERS_FILE = path.join(DATA_DIR, 'users.json');
      fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    }

    // Send prize email (async, don't wait)
    if (prize.name !== 'Try Again') {
      sendPrizeEmail(email, prize.name, prizeCode, prize.value).catch(err =>
        console.error('Failed to send prize email:', err)
      );
    }

    return NextResponse.json({
      success: true,
      prize,
      code: prizeCode,
    });
  } catch (error) {
    console.error('Error in spin:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
