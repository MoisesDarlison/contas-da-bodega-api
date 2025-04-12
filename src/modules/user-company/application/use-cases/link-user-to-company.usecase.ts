import { Injectable, NotFoundException } from '@nestjs/common';
import { AUserCompanyRepository } from '../../domain/contracts/user-company-repository.abstract';

import { ACompanyRepository } from 'src/modules/company/domain/contracts/company-repository.abstract';
import { AUserRepository } from 'src/modules/user/domain/contracts/user-repository.abstract';
import { ConflictError } from 'src/shared/domain/errors';
import { ERROR_MESSAGES } from 'src/shared/domain/errors/error-messages';
import { LoggerService } from 'src/shared/infrastructure/logging/services/logger.service';
import { UserCompany } from '../../domain/entities/user-company.entity';
import { ILinkUserToCompanyUseCaseInput } from '../contracts/link-user-to-company.contract';

@Injectable()
export class LinkUserToCompanyUseCase {
  constructor(
    private readonly logger: LoggerService,
    private readonly userCompanyRepo: AUserCompanyRepository,
    private readonly userRepo: AUserRepository,
    private readonly companyRepo: ACompanyRepository,
  ) {}

  async execute(input: ILinkUserToCompanyUseCaseInput): Promise<void> {
    const prefix = `${LinkUserToCompanyUseCase.name}.${this.execute.name}`;
    this.logger.log('Link User To Company UseCase', prefix, input);

    const user = await this.userRepo.findById(input.userId);
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const company = await this.companyRepo.findById(input.companyId);
    if (!company) {
      throw new NotFoundException(ERROR_MESSAGES.COMPANY_NOT_FOUND);
    }

    const alreadyLinked =
      await this.userCompanyRepo.findLinkByUserIdAndCompanyId(
        input.userId,
        input.companyId,
      );
    if (alreadyLinked) {
      throw new ConflictError(ERROR_MESSAGES.LINK_ALREADY_EXISTS);
    }

    //FIXME: Devera pegar o ID direto pela autenticação
    const link = UserCompany.create({
      userId: input.userId,
      companyId: input.companyId,
      editorId: input.userId,
      permissionType: input.permissionType,
    });

    await this.userCompanyRepo.create(link);
  }
}
