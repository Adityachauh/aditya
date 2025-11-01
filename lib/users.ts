import { UserEntry } from '@/types';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize users file if it doesn't exist
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}

export function hashEmail(email: string): string {
  return crypto.createHash('sha256').update(email.toLowerCase()).digest('hex');
}

export function getUsers(): UserEntry[] {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export function saveUser(user: UserEntry): void {
  const users = getUsers();
  users.push(user);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

export function hasUserSpun(email: string): boolean {
  const users = getUsers();
  const emailHash = hashEmail(email);
  return users.some(u => hashEmail(u.email) === emailHash);
}

export function getUserStats() {
  const users = getUsers();
  return {
    totalSpins: users.length,
    emailsCollected: users.length,
    prizesDistributed: users.filter(u => u.prize && u.prize !== 'Try Again').length,
  };
}
