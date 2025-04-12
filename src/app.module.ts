import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { CompanyModule } from './modules/company/company.module';
import { UserCompanyModule } from './modules/user-company/user-company.module';
import { UserModule } from './modules/user/user.module';
import { LoggerModule } from './shared/infrastructure/logging/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule,
    UserModule,
    CompanyModule,
    UserCompanyModule,
    MongooseModule.forRoot(process.env.MONGO_URI as string, {
      dbName: process.env.MONGO_DB_NAME as string,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
