import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { FindAllUsersUseCase } from './application/use-cases/find-all-user.usecase';
import { AUserRepository } from './domain/contracts/user-repository.abstract';
import { UserRepositoryImpl } from './infrastructure/database/mongodb/repositories/user.repository.impl';
import {
  User,
  UserSchema,
} from './infrastructure/database/mongodb/schemas/user.schema';
import { UserController } from './presentation/controllers/user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    FindAllUsersUseCase,
    {
      provide: AUserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [AUserRepository],
})
export class UserModule {}
