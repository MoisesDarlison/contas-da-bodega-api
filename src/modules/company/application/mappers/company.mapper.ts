import { Company } from '../../domain/entities/company.entity';
import { ICreateCompanyUseCaseOutput } from '../contracts/create-company.contract';

export function companyDomainToApplication(
  company: Company,
): ICreateCompanyUseCaseOutput {
  const output = company.toObject();
  return {
    id: output.id,
    name: output.name,
    email: output.email,
  };
}
