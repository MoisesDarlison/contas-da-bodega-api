import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { PersonModule } from './modules/person/person.module';

@Module({
  imports: [ConfigModule.forRoot(), PersonModule],
  controllers: [AppController],
})
export class AppModule {}
