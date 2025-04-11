export interface IFindAllUserUseCaseInput {
  page: number;
  limit: number;
}

interface UserOutput {
  id: string;
  name: string;
  email: string;
}

export interface IFindAllUserOutput {
  data: UserOutput[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}
