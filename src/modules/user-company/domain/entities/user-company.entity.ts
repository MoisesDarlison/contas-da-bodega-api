import { PermissionTypesEnum } from 'src/shared/enums/permission-types.enum';

export class UserCompany {
  private constructor(
    private readonly userId: string,
    private readonly companyId: string,
    private permissionType: PermissionTypesEnum,
    private readonly createdAt: Date,
    private updatedAt: Date,
  ) {}

  static create(input: {
    userId: string;
    companyId: string;
    permissionType: PermissionTypesEnum;
  }): UserCompany {
    const now = new Date();
    return new UserCompany(
      input.userId,
      input.companyId,
      input.permissionType,
      now,
      now,
    );
  }

  static clone(props: {
    userId: string;
    companyId: string;
    permissionType: PermissionTypesEnum;
    createdAt: Date;
    updatedAt: Date;
  }): UserCompany {
    return new UserCompany(
      props.userId,
      props.companyId,
      props.permissionType,
      props.createdAt,
      props.updatedAt,
    );
  }

  getUserId(): string {
    return this.userId;
  }

  getCompanyId(): string {
    return this.companyId;
  }

  getPermissionType(): PermissionTypesEnum {
    return this.permissionType;
  }

  setPermissionType(newType: PermissionTypesEnum): void {
    this.permissionType = newType;
    this.touch();
  }

  private touch(): void {
    this.updatedAt = new Date();
  }
}
