import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/modules/user/domain/entities/user.entity';
import { IUserRepository } from 'src/modules/user/domain/repositories/user.repository';
import { LoggerService } from 'src/shared/logging/services/logger.service';
import { UserDocument } from '../contracts/user-document.contract';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
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

    const doc: UserDocument = await this.userModel.create({
      id: user.getId(),
      name: user['name'],
      email: user['email'],
      phone: user['phone'],
      isActive: user['isActive'],
      createdAt: user['createdAt'],
      updatedAt: user['updatedAt'],
    });

    return this.toEntity(doc);
  }

  async findById(id: string): Promise<User | null> {
    const prefix = `${UserRepositoryImpl.name}.${this.findById.name}`;
    this.logger.log('User DB', prefix);

    const doc = await this.userModel.findById(id);
    if (!doc) return null;
    return this.toEntity(doc);
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ docs: User[]; total: number }> {
    const prefix = `${UserRepositoryImpl.name}.${this.findAll.name}`;
    this.logger.log('User DB', prefix);

    const skip = (page - 1) * limit;
    const [docs, total] = await Promise.all([
      this.userModel.find().skip(skip).limit(limit).lean(),
      this.userModel.countDocuments(),
    ]);
    return {
      docs: docs.map(this.toEntity),
      total,
    };
  }
}
