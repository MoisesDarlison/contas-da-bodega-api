export interface ICreateUserUseCaseInput {
  name: string;
  email: string;
  company: string;
  phone?: string;
}

export interface ICreateUserUseCaseOutput {
  id: string;
  name: string;
  email: string;
}
