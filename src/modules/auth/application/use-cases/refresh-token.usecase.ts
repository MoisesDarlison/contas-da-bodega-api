/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedError } from 'src/shared/domain/errors/exceptions/unauthorized.error';
import { LoggerService } from 'src/shared/infrastructure/logging/services/logger.service';
import { AuthenticatedUser } from '../../domain/entities/authenticated-user.entity';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly logger: LoggerService,
  ) {}

  execute(refreshToken: string): AuthenticatedUser {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const newAccessToken = this.jwtService.sign(
        { sub: payload.sub, email: payload.email, name: payload.name },
        { secret: process.env.JWT_SECRET, expiresIn: '1h' },
      );

      return new AuthenticatedUser(
        newAccessToken,
        refreshToken,
        payload.sub as string,
        payload.email as string,
        payload.name as string,
      );
    } catch (err) {
      this.logger.warn(JSON.stringify(err));
      throw new UnauthorizedError('Invalid refresh token');
    }
  }
}
