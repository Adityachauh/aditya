import { NextResponse } from 'next/server';
import { getUserStats } from '@/lib/users';
import { getPrizes } from '@/lib/prizes';

export async function GET() {
  try {
    const userStats = getUserStats();
    const prizes = getPrizes();

    return NextResponse.json({
      ...userStats,
      prizes,
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
