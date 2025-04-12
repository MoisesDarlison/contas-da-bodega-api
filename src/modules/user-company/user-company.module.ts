import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LoggerService } from 'src/shared/infrastructure/logging/services/logger.service';
import { CompanyModule } from '../company/company.module';
import { UserModule } from '../user/user.module';
import { GetCompaniesByUserIdUseCase } from './application/use-cases/get-companies-by-user-id.usecase';
import { GetUserByCompanyIdUseCase } from './application/use-cases/get-user-by-company-id.usecase';
import { LinkUserToCompanyUseCase } from './application/use-cases/link-user-to-company.usecase';
import { AUserCompanyRepository } from './domain/contracts/user-company-repository.abstract';
import { UserCompanyRepositoryImpl } from './infrastructure/database/mongodb/repositories/user-company.repository.impl';
import {
  UserCompany,
  UserCompanySchema,
} from './infrastructure/database/mongodb/schemas/user-company.schema';
import { UserCompanyController } from './presentation/controllers/user-company.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserCompany.name, schema: UserCompanySchema },
    ]),
    UserModule,
    CompanyModule,
  ],
  controllers: [UserCompanyController],
  providers: [
    {
      provide: AUserCompanyRepository,
      useClass: UserCompanyRepositoryImpl,
    },
    LoggerService,
    LinkUserToCompanyUseCase,
    GetCompaniesByUserIdUseCase,
    GetUserByCompanyIdUseCase,
  ],
  exports: [AUserCompanyRepository],
})
export class UserCompanyModule {}
