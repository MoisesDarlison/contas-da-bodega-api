import { User } from '../../domain/entities/user.entity';

export function userDomainToApplication(user: User) {
  return {
    id: user.getId(),
    name: user['name'],
    email: user['email'],
  };
}
