import { Company } from '../../domain/entities/company.entity';

export function companyDomainToApplication(company: Company) {
  const output = company.toObject();
  return {
    id: output.id,
    name: output.name,
    email: output.email,
  };
}
