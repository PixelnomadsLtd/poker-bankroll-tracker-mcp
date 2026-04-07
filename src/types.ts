export const SESSION_TYPES = [
  "cashgame",
  "tournament",
  "payout",
  "costs",
  "casinogame",
  "jackpot",
] as const;

export type SessionType = (typeof SESSION_TYPES)[number];

export interface Session {
  id: number;
  type: SessionType;
  start: string;
  location: string;
  location_type: string;
  currency: string;
  buyin: number;
  cashout: number;
  number_of_rebuys: number;
  rebuy_costs: number;
  expenses: number;
  expenses_in_chips: number;
  currency_exchange_rate: string;
  staking: boolean;
  private: boolean;
  // Cash game only
  limit?: string;
  game?: string;
  table_size?: string;
  small_blind?: number;
  big_blind?: number;
  third_blind?: number;
  ante?: number;
  hands_per_hour?: number;
}

export interface SessionsResponse {
  data: Session[];
}

export interface SessionFilters {
  start?: string;
  end?: string;
  type?: string;
  currency?: string;
  staking?: boolean;
}
