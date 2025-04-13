export class AuthenticatedUser {
  constructor(
    private readonly accessToken: string,
    private readonly refreshToken: string,
    private readonly userId: string,
    private readonly email: string,
    private readonly name: string,
  ) {}

  getAccessToken(): string {
    return this.accessToken;
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }

  getUserId(): string {
    return this.userId;
  }

  getEmail(): string {
    return this.email;
  }

  getName(): string {
    return this.name;
  }

  toObject() {
    return {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
      userId: this.userId,
      email: this.email,
      name: this.name,
    };
  }
}
