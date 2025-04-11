import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { FindAllUsersUseCase } from './application/use-cases/find-all-user.usecase';
import { UserController } from './controllers/user.controller';
import { IUserRepository } from './domain/repositories/user.repository';
import { UserRepositoryImpl } from './infrastructure/database/mongodb/repositories/user.repository.impl';
import {
  User,
  UserSchema,
} from './infrastructure/database/mongodb/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    FindAllUsersUseCase,
    {
      provide: IUserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [IUserRepository],
})
export class UserModule {}
