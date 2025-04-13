import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtPayload } from 'src/modules/auth/application/contracts/sing-in.contract';
import { AUserRepository } from 'src/modules/user/domain/contracts/user-repository.abstract';
import { ERROR_MESSAGES } from 'src/shared/domain/errors/error-messages';
import { UnauthorizedError } from 'src/shared/domain/errors/exceptions/unauthorized.error';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepo: AUserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'defaultSecret',
    });
  }

  async validate(payload: IJwtPayload) {
    const user = await this.userRepo.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedError(ERROR_MESSAGES.INVALID_TOKEN);
    }
    return payload;
  }
}
