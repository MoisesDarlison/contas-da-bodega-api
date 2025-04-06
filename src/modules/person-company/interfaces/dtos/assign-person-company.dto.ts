import { IsNotEmpty, IsString } from 'class-validator';

export class AssignPersonCompanyDto {
  @IsNotEmpty()
  @IsString()
  personId: string;

  @IsNotEmpty()
  @IsString()
  companyId: string;
}
