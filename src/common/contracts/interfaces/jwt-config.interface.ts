export interface JwtConfig {
  accessSecret: string;
  refreshSecret: string;
  accessTTL: number;
  refreshTTL: number;
}
