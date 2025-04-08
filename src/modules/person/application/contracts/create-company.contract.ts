export interface ICreatePersonUseCaseInput {
  name: string;
  email: string;
  company: string;
  phone?: string;
}

export interface ICreatePersonUseCaseOutput {
  id: string;
  name: string;
  email: string;
}
