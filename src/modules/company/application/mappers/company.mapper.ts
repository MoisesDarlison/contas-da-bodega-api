import { Company } from '../../domain/entities/company.entity';

export function companyDomainToApplication(company: Company) {
  return {
    id: company.getId(),
    name: company['name'],
    email: company['email'].getEmail(),
  };
}
