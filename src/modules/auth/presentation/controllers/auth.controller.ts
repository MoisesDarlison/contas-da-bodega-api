import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { RefreshTokenUseCase } from '../../application/use-cases/refresh-token.usecase';
import { SignInUseCase } from '../../application/use-cases/sign-in.usecase';
import { SignInDto } from '../dtos/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signInUseCase: SignInUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @Post('login')
  @HttpCode(200)
  async signIn(@Body() body: SignInDto) {
    return await this.signInUseCase.execute(body);
  }

  @Post('refresh')
  refresh(@Body('refreshToken') token: string) {
    return this.refreshTokenUseCase.execute(token);
  }
}
