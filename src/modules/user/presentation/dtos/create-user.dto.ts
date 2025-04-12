import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Validate,
} from 'class-validator';
import { MatchPasswordsConstraint } from 'src/shared/domain/decorators/match-password-dto.decorator';

export class CreateRequestUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
  })
  password: string;

  @IsNotEmpty()
  @Validate(MatchPasswordsConstraint)
  passwordConfirm: string;

  @IsOptional()
  @IsString()
  phone?: string;

  isPasswordConfirmed(): boolean {
    return this.password === this.passwordConfirm;
  }
}
