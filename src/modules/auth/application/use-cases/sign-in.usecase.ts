/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AUserRepository } from 'src/modules/user/domain/contracts/user-repository.abstract';
import { UnauthorizedError } from 'src/shared/domain/errors/exceptions/unauthorized.error';
import {
  ISignInUseCaseInput,
  ISignInUseCaseOutput,
} from '../contracts/sing-in.contract';

@Injectable()
export class SingInUseCase {
  constructor(
    private readonly usersRepo: AUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  private getExpiresAtToken(accessToken: string): string {
    const decodedToken = this.jwtService.decode(accessToken);
    if (!decodedToken || typeof decodedToken.exp !== 'number') {
      throw new Error('Invalid token structure');
    }
    const expiresAt = decodedToken.exp * 1000;
    return new Date(expiresAt).toISOString();
  }

  async execute(input: ISignInUseCaseInput): Promise<ISignInUseCaseOutput> {
    const { email, password } = input;
    const userByEmail = await this.usersRepo.findByEmail(email);
    if (!userByEmail) throw new UnauthorizedError();

    const user = userByEmail.toObject();
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new UnauthorizedError();

    const payload = {
      sub: user.id,
      username: user.name,
      email: user.email,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    const expiresAt = this.getExpiresAtToken(accessToken);
    return { accessToken, expiresAt };
  }
}
