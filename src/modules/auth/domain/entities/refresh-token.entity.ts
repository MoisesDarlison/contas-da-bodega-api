export class RefreshToken {
  constructor(
    private readonly token: string,
    private readonly userId: string,
    private readonly expiresAt: Date,
    private readonly createdAt: Date,
  ) {}

  getToken(): string {
    return this.token;
  }

  getUserId(): string {
    return this.userId;
  }

  getExpiresAt(): Date {
    return this.expiresAt;
  }

  isExpired(): boolean {
    return new Date() > this.expiresAt;
  }
}
