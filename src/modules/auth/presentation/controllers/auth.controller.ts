import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { SingInUseCase } from '../../application/use-cases/sign-in.usecase';
import { SignInDto } from '../dtos/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly singInUseCase: SingInUseCase) {}

  @Post('login')
  async signIn(
    @Body(ValidationPipe) body: SignInDto,
  ): Promise<{ accessToken: string }> {
    return await this.singInUseCase.execute(body);
  }
}
