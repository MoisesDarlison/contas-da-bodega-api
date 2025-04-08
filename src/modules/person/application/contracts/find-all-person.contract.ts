export interface IFindAllPersonUseCaseInput {
  page: number;
  limit: number;
}

interface PersonOutput {
  id: string;
  name: string;
  email: string;
}

export interface IFindAllPersonOutput {
  data: PersonOutput[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}
