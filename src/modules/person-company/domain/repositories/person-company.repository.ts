import { PersonCompany } from '../entities/person-company.entity';

export abstract class PersonCompanyRepository {
  abstract create(link: PersonCompany): Promise<void>;
  abstract findLinkByPersonIdAndCompanyId(
    personId: string,
    companyId: string,
  ): Promise<PersonCompany | null>;
  abstract findCompaniesByPersonId(personId: string): Promise<PersonCompany[]>;
  abstract findPersonsByCompanyId(companyId: string): Promise<PersonCompany[]>;
}
