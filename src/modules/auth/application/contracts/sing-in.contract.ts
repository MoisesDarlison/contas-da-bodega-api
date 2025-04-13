export interface ISignInUseCaseInput {
  email: string;
  password: string;
}

export interface ISignInUseCaseOutput {
  accessToken: string;
  refreshToken: string;
  userId: string;
  email: string;
  name: string;
}

export interface IJwtPayload {
  sub: string;
  email: string;
  name: string;
}
