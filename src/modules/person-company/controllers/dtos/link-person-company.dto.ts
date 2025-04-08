import { IsEnum, IsUUID } from 'class-validator';
import { PermissionTypesEnum } from 'src/shared/enums/permission-types.enum';

export class LinkPersonToCompanyDto {
  @IsUUID()
  personId: string;

  @IsUUID()
  companyId: string;

  @IsEnum(PermissionTypesEnum)
  permissionType: PermissionTypesEnum;
}

export class LinkPersonToCompanyResponseDto {
  message: string;
}
