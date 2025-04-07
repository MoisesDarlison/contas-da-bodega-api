import { Injectable, NotFoundException } from '@nestjs/common';
import { PersonCompanyRepository } from '../../domain/repositories/person-company.repository';
import { PersonCompany } from '../../domain/entities/person-company.entity';
import { PermissionTypesEnum } from 'src/shared/enums/permission-types.enum';

import { PersonRepository } from 'src/modules/person/domain/repositories/person.repository';
import { CompanyRepository } from 'src/modules/company/domain/repositories/company.repository';

@Injectable()
export class LinkPersonToCompanyUseCase {
  constructor(
    private readonly personCompanyRepo: PersonCompanyRepository,
    private readonly personRepo: PersonRepository,
    private readonly companyRepo: CompanyRepository,
  ) {}

  async execute(input: {
    personId: string;
    companyId: string;
    permissionType: PermissionTypesEnum;
  }): Promise<void> {
    const person = await this.personRepo.findById(input.personId);
    if (!person) {
      throw new NotFoundException('Person not found');
    }

    const company = await this.companyRepo.findById(input.companyId);
    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const alreadyLinked =
      await this.personCompanyRepo.findLinkByPersonIdAndCompanyId(
        input.personId,
        input.companyId,
      );
    if (alreadyLinked) {
      throw new Error('Person is already linked to this company');
    }

    const link = PersonCompany.create({
      personId: input.personId,
      companyId: input.companyId,
      permissionType: input.permissionType,
    });

    await this.personCompanyRepo.create(link);
  }
}
