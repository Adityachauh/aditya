import { NextRequest, NextResponse } from 'next/server';
import { hasUserSpun, saveUser } from '@/lib/users';
import { addToMailchimp } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user has already spun
    if (hasUserSpun(email)) {
      return NextResponse.json(
        { error: 'You have already participated. Only one spin per email address is allowed.' },
        { status: 400 }
      );
    }

    // Save user entry
    saveUser({
      email,
      name,
      timestamp: Date.now(),
    });

    // Add to email marketing platform (async, don't wait)
    addToMailchimp(email, name).catch(err => 
      console.error('Failed to add to Mailchimp:', err)
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in submit-email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
