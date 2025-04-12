export interface ICreateUserUseCaseInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface ICreateUserUseCaseOutput {
  id: string;
  name: string;
  email: string;
}
