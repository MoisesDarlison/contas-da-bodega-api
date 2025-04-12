import { IsEnum, IsUUID } from 'class-validator';
import { PermissionTypesEnum } from 'src/shared/domain/enums/permission-types.enum';

export class LinkUserToCompanyDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  companyId: string;

  @IsEnum(PermissionTypesEnum)
  permissionType: PermissionTypesEnum;
}

export class LinkUserToCompanyResponseDto {
  message: string;
}
