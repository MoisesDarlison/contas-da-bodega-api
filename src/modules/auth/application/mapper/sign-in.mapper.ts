import { AuthenticatedUser } from '../../domain/entities/authenticated-user.entity';
import { ISignInUseCaseOutput } from '../contracts/sing-in.contract';

export function authenticatedUserDomainToApplication(
  authenticatedUser: AuthenticatedUser,
): ISignInUseCaseOutput {
  const output = authenticatedUser.toObject();
  return {
    name: output.name,
    email: output.email,
    accessToken: output.accessToken,
    refreshToken: output.refreshToken,
    userId: output.userId,
  };
}
