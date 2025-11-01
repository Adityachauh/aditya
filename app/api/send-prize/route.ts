import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { prizeId, address } = await request.json();

    if (!prizeId || !address) {
      return NextResponse.json(
        { error: 'Prize ID and address are required' },
        { status: 400 }
      );
    }

    // Save shipping address to file
    const DATA_DIR = path.join(process.cwd(), 'data');
    const ADDRESSES_FILE = path.join(DATA_DIR, 'addresses.json');

    let addresses = [];
    if (fs.existsSync(ADDRESSES_FILE)) {
      const data = fs.readFileSync(ADDRESSES_FILE, 'utf-8');
      addresses = JSON.parse(data);
    }

    addresses.push({
      prizeId,
      address,
      timestamp: Date.now(),
    });

    fs.writeFileSync(ADDRESSES_FILE, JSON.stringify(addresses, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving address:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
