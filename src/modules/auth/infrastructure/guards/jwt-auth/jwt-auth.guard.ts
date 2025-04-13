import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Missing token');
    }

    try {
      const payload = this.jwtService.verifyAsync<{
        userId: string;
        username: string;
      }>(token, {
        secret: process.env.JWT_SECRET,
      });

      request['user'] = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authorization =
      typeof request.headers['authorization'] === 'string'
        ? request.headers['authorization']
        : undefined;
    if (typeof authorization === 'string') {
      const [type, token] = authorization.split(' ');
      return type === 'Bearer' ? token : undefined;
    }
    return undefined;
  }
}
