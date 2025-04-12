import { User } from '../entities/user.entity';

export abstract class AUserRepository {
  abstract create(user: User): Promise<User>;
  abstract findById(id: string): Promise<User | null>;
  abstract findAll(page: number, limit: number): Promise<User[]>;
  abstract countDocuments(): Promise<number>;
}
