export interface ISignInUseCaseInput {
  email: string;
  password: string;
}

export interface ISignInUseCaseOutput {
  accessToken: string;
  expiresAt: string;
}
