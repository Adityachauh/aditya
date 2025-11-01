import { NextRequest, NextResponse } from 'next/server';
import { getPrizes, savePrizes } from '@/lib/prizes';
import { Prize } from '@/types';

export async function GET() {
  try {
    const prizes = getPrizes();
    return NextResponse.json({ prizes });
  } catch (error) {
    console.error('Error getting prizes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const prize: Prize = await request.json();

    const prizes = getPrizes();
    prizes.push(prize);
    savePrizes(prizes);

    return NextResponse.json({ success: true, prize });
  } catch (error) {
    console.error('Error creating prize:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedPrize: Prize = await request.json();

    const prizes = getPrizes();
    const index = prizes.findIndex(p => p.id === updatedPrize.id);

    if (index === -1) {
      return NextResponse.json(
        { error: 'Prize not found' },
        { status: 404 }
      );
    }

    prizes[index] = updatedPrize;
    savePrizes(prizes);

    return NextResponse.json({ success: true, prize: updatedPrize });
  } catch (error) {
    console.error('Error updating prize:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Prize ID is required' },
        { status: 400 }
      );
    }

    const prizes = getPrizes();
    const filteredPrizes = prizes.filter(p => p.id !== id);

    if (prizes.length === filteredPrizes.length) {
      return NextResponse.json(
        { error: 'Prize not found' },
        { status: 404 }
      );
    }

    savePrizes(filteredPrizes);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting prize:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
