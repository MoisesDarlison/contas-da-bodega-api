import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LoggerService } from 'src/shared/logging/services/logger.service';
import { CompanyModule } from '../company/company.module';
import { UserModule } from '../user/user.module';
import { GetCompaniesByUserIdUseCase } from './application/use-cases/get-companies-by-user-id.usecase';
import { GetUserByCompanyIdUseCase } from './application/use-cases/get-user-by-company-id.usecase';
import { LinkUserToCompanyUseCase } from './application/use-cases/link-user-to-company.usecase';
import { UserCompanyController } from './controllers/user-company.controller';
import { IUserCompanyRepository } from './domain/repositories/user-company.repository';
import { UserCompanyRepositoryImpl } from './infrastructure/database/mongodb/repositories/user-company.repository.impl';
import {
  UserCompany,
  UserCompanySchema,
} from './infrastructure/database/mongodb/schemas/user-company.schema';

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
      provide: IUserCompanyRepository,
      useClass: UserCompanyRepositoryImpl,
    },
    LoggerService,
    LinkUserToCompanyUseCase,
    GetCompaniesByUserIdUseCase,
    GetUserByCompanyIdUseCase,
  ],
  exports: [IUserCompanyRepository],
})
export class UserCompanyModule {}
