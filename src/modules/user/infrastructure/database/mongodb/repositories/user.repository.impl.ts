import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AUserRepository } from 'src/modules/user/domain/contracts/user-repository.abstract';
import { User } from 'src/modules/user/domain/entities/user.entity';
import { LoggerService } from 'src/shared/infrastructure/logging/services/logger.service';
import { UserDocument } from '../contracts/user-document.contract';

@Injectable()
export class UserRepositoryImpl implements AUserRepository {
  private toEntity = (data: UserDocument): User => {
    return User.clone(data._id, data);
  };

  constructor(
    private readonly logger: LoggerService,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async create(user: User): Promise<User> {
    const prefix = `${UserRepositoryImpl.name}.${this.create.name}`;
    this.logger.log('User DB', prefix);

    const input = user.toObject();
    const doc: UserDocument = await this.userModel.create({
      ...input,
      password: user['password'],
    });
    return this.toEntity(doc);
  }

  async findById(id: string): Promise<User | null> {
    const prefix = `${UserRepositoryImpl.name}.${this.findById.name}`;
    this.logger.log('User DB', prefix);

    const doc = await this.userModel.findById(id);
    if (!doc || doc.deletedAt) return null;
    return this.toEntity(doc);
  }

  async findByEmail(email: string): Promise<User | null> {
    const prefix = `${UserRepositoryImpl.name}.${this.findByEmail.name}`;
    this.logger.log('User DB', prefix);

    const doc = await this.userModel.findOne({ email });
    if (!doc || doc.deletedAt) return null;
    return this.toEntity(doc);
  }

  async findAll(page: number, limit: number): Promise<User[]> {
    const prefix = `${UserRepositoryImpl.name}.${this.findAll.name}`;
    this.logger.log('User DB', prefix);

    const skip = (page - 1) * limit;
    const docs = await this.userModel
      .find({ deletedAt: null })
      .skip(skip)
      .limit(limit)
      .lean();
    return docs.map(this.toEntity);
  }

  async countDocuments(): Promise<number> {
    const prefix = `${UserRepositoryImpl.name}.${this.countDocuments.name}`;
    this.logger.log('User DB', prefix);
    return await this.userModel.countDocuments();
  }
}
