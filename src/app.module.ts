import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { CompanynModule } from './modules/company/company.module';
import { PersonModule } from './modules/person/person.module';

@Module({
  imports: [ConfigModule.forRoot(), PersonModule, CompanynModule],
  controllers: [AppController],
})
export class AppModule {}
