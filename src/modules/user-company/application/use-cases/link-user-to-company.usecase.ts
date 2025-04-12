import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserCompanyRepository } from '../../domain/repositories/user-company.repository';

import { ICompanyRepository } from 'src/modules/company/domain/repositories/company.repository';
import { IUserRepository } from 'src/modules/user/domain/repositories/user.repository';
import { ERROR_MESSAGES } from 'src/shared/errors/error-messages';
import { ConflictError } from 'src/shared/errors/exceptions';
import { LoggerService } from 'src/shared/logging/services/logger.service';
import { UserCompany } from '../../domain/entities/user-company.entity';
import { ILinkUserToCompanyUseCaseInput } from '../contracts/link-user-to-company.contract';

@Injectable()
export class LinkUserToCompanyUseCase {
  constructor(
    private readonly logger: LoggerService,
    private readonly userCompanyRepo: IUserCompanyRepository,
    private readonly userRepo: IUserRepository,
    private readonly companyRepo: ICompanyRepository,
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
