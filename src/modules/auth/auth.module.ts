import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { RefreshTokenUseCase } from './application/use-cases/refresh-token.usecase';
import { SignInUseCase } from './application/use-cases/sign-in.usecase';
import { JwtStrategy } from './infrastructure/guards/strategy/jwt-auth.strategy';
import { AuthController } from './presentation/controllers/auth.controller';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [SignInUseCase, RefreshTokenUseCase, JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
