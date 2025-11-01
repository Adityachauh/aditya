import { Prize } from '@/types';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const PRIZES_FILE = path.join(DATA_DIR, 'prizes.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Default prizes configuration
const defaultPrizes: Prize[] = [
  {
    id: '1',
    name: '50% OFF',
    type: 'digital',
    probability: 20,
    quantity: 100,
    remaining: 100,
    value: '50% discount code',
    color: '#FF6B6B',
  },
  {
    id: '2',
    name: 'Free Shipping',
    type: 'digital',
    probability: 25,
    quantity: 150,
    remaining: 150,
    value: 'Free shipping code',
    color: '#4ECDC4',
  },
  {
    id: '3',
    name: '$10 Gift Card',
    type: 'digital',
    probability: 15,
    quantity: 75,
    remaining: 75,
    value: '$10 gift card',
    color: '#45B7D1',
  },
  {
    id: '4',
    name: '20% OFF',
    type: 'digital',
    probability: 25,
    quantity: 200,
    remaining: 200,
    value: '20% discount code',
    color: '#FFA07A',
  },
  {
    id: '5',
    name: 'Mystery Box',
    type: 'physical',
    probability: 5,
    quantity: 20,
    remaining: 20,
    value: 'Physical mystery box',
    color: '#9B59B6',
  },
  {
    id: '6',
    name: 'Try Again',
    type: 'digital',
    probability: 10,
    quantity: 1000,
    remaining: 1000,
    value: 'Better luck next time!',
    color: '#95A5A6',
  },
];

// Initialize prizes file if it doesn't exist
if (!fs.existsSync(PRIZES_FILE)) {
  fs.writeFileSync(PRIZES_FILE, JSON.stringify(defaultPrizes, null, 2));
}

export function getPrizes(): Prize[] {
  try {
    const data = fs.readFileSync(PRIZES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return defaultPrizes;
  }
}

export function savePrizes(prizes: Prize[]): void {
  fs.writeFileSync(PRIZES_FILE, JSON.stringify(prizes, null, 2));
}

export function selectPrize(): Prize | null {
  const prizes = getPrizes();
  const availablePrizes = prizes.filter(p => p.remaining > 0);
  
  if (availablePrizes.length === 0) {
    return null;
  }

  // Calculate total probability
  const totalProbability = availablePrizes.reduce((sum, p) => sum + p.probability, 0);
  
  // Generate random number
  let random = Math.random() * totalProbability;
  
  // Select prize based on probability
  for (const prize of availablePrizes) {
    random -= prize.probability;
    if (random <= 0) {
      return prize;
    }
  }
  
  return availablePrizes[0];
}

export function decrementPrize(prizeId: string): void {
  const prizes = getPrizes();
  const prize = prizes.find(p => p.id === prizeId);
  
  if (prize && prize.remaining > 0) {
    prize.remaining--;
    savePrizes(prizes);
  }
}

export function generateCode(prizeId: string): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prizeId}-${timestamp}-${random}`;
}
