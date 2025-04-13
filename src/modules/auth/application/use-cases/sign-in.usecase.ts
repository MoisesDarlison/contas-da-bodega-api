// src/modules/auth/application/use-cases/sign-in.usecase.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'; // Importar bcrypt para comparar senhas
import { AUserRepository } from 'src/modules/user/domain/contracts/user-repository.abstract';
import { UnauthorizedError } from 'src/shared/domain/errors/exceptions/unauthorized.error';
import { AuthenticatedUser } from '../../domain/entities/authenticated-user.entity';
import {
  IJwtPayload,
  ISignInUseCaseInput,
  ISignInUseCaseOutput,
} from '../contracts/sing-in.contract';
import { authenticatedUserDomainToApplication } from '../mapper/sign-in.mapper';

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: AUserRepository,
  ) {}

  async execute(input: ISignInUseCaseInput): Promise<ISignInUseCaseOutput> {
    const userByEmail = await this.userRepository.findByEmail(input.email);

    if (!userByEmail) throw new UnauthorizedError();

    const user = userByEmail.toObject();
    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedError();

    const jwtPayload: IJwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };
    const accessToken = this.jwtService.sign(jwtPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });

    const refreshToken = this.jwtService.sign(jwtPayload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
    const output = new AuthenticatedUser(
      accessToken,
      refreshToken,
      user.id,
      user.email,
      user.name,
    );
    return authenticatedUserDomainToApplication(output);
  }
}
