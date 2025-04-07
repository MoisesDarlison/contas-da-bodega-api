import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { PersonModule } from './modules/person/person.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from './modules/company/company.module';
import { PersonCompanyModule } from './modules/person-company/person-company.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PersonModule,
    CompanyModule,
    PersonCompanyModule,
    MongooseModule.forRoot(process.env.MONGO_URI as string),
  ],
  controllers: [AppController],
})
export class AppModule {}
