import { Injectable, NotFoundException } from '@nestjs/common';
import { PersonCompany } from '../../domain/entities/person-company.entity';
import { PersonCompanyRepository } from '../../domain/repositories/person-company.repository';

import { CompanyRepository } from 'src/modules/company/domain/repositories/company.repository';
import { PersonRepository } from 'src/modules/person/domain/repositories/person.repository';
import { ERROR_MESSAGES } from 'src/shared/errors/error-messages';
import { ConflictError } from 'src/shared/errors/exceptions';
import { ILinkPersonToCompanyUseCaseInput } from '../contracts/link-person-to-company.contract';

@Injectable()
export class LinkPersonToCompanyUseCase {
  constructor(
    private readonly personCompanyRepo: PersonCompanyRepository,
    private readonly personRepo: PersonRepository,
    private readonly companyRepo: CompanyRepository,
  ) {}

  async execute(input: ILinkPersonToCompanyUseCaseInput): Promise<void> {
    const person = await this.personRepo.findById(input.personId);
    if (!person) {
      throw new NotFoundException(ERROR_MESSAGES.PERSON_NOT_FOUND);
    }

    const company = await this.companyRepo.findById(input.companyId);
    if (!company) {
      throw new NotFoundException(ERROR_MESSAGES.COMPANY_NOT_FOUND);
    }

    const alreadyLinked =
      await this.personCompanyRepo.findLinkByPersonIdAndCompanyId(
        input.personId,
        input.companyId,
      );
    if (alreadyLinked) {
      throw new ConflictError(ERROR_MESSAGES.LINK_ALREADY_EXISTS);
    }

    const link = PersonCompany.create({
      personId: input.personId,
      companyId: input.companyId,
      permissionType: input.permissionType,
    });

    await this.personCompanyRepo.create(link);
  }
}
