import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { CompanyModule } from './modules/company/company.module';
import { PersonCompanyModule } from './modules/person-company/person-company.module';
import { PersonModule } from './modules/person/person.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PersonModule,
    CompanyModule,
    PersonCompanyModule,
    MongooseModule.forRoot(process.env.MONGO_URI as string, {
      dbName: process.env.MONGO_DB_NAME as string,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
