export interface Prize {
  id: string;
  name: string;
  type: 'digital' | 'physical';
  probability: number;
  quantity: number;
  remaining: number;
  value?: string;
  color: string;
  code?: string;
}

export interface UserEntry {
  email: string;
  name?: string;
  timestamp: number;
  prize?: string;
  prizeId?: string;
}

export interface SpinResult {
  success: boolean;
  prize?: Prize;
  message?: string;
  code?: string;
}

export interface AdminStats {
  totalSpins: number;
  emailsCollected: number;
  prizesDistributed: number;
  prizes: Prize[];
}
