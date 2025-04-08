export interface ICreateCompanyUseCaseInput {
  name: string;
  email: string;
  phone?: string;
}

export interface ICreateCompanyUseCaseOutput {
  id: string;
  name: string;
  email: string;
}
