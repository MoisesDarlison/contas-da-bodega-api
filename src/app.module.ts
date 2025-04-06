import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { CompanyModule } from './modules/company/company.module';
import { PersonModule } from './modules/person/person.module';
import { PersonCompanyModule } from './modules/person-company/person-company.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PersonModule,
    CompanyModule,
    PersonCompanyModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
