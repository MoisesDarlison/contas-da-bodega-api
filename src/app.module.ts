import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { PersonModule } from './modules/person/person.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PersonModule,
    MongooseModule.forRoot(process.env.MONGO_URI as string),
  ],
  controllers: [AppController],
})
export class AppModule {}
