import { User } from '../../domain/entities/user.entity';

export function userDomainToApplication(user: User) {
  const output = user.toObject();
  return {
    id: output.id,
    name: output.name,
    email: output.email,
  };
}
