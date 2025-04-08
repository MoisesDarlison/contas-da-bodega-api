export interface IFindAllCompanyUseCaseInput {
  page: number;
  limit: number;
}

interface CompanyOutput {
  id: string;
  name: string;
  email: string;
}

export interface IFindAllCompanyOutput {
  data: CompanyOutput[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}
