import { PermissionTypesEnum } from 'src/shared/domain/enums/permission-types.enum';
interface IEditorInfo {
  userid: string;
  updatedAt: Date;
}

export class UserCompany {
  private constructor(
    private readonly userId: string,
    private readonly companyId: string,
    private permissionType: PermissionTypesEnum,
    private isActive: boolean,
    private editorInfo: IEditorInfo,
    private readonly createdAt: Date,
    private updatedAt: Date,
    private deletedAt?: Date | null,
  ) {}

  static create(input: {
    userId: string;
    companyId: string;
    editorId: string;
    permissionType: PermissionTypesEnum;
  }): UserCompany {
    const now = new Date();
    return new UserCompany(
      input.userId,
      input.companyId,
      input.permissionType,
      true,
      { userid: input.editorId, updatedAt: now },
      now,
      now,
    );
  }

  static clone(props: {
    userId: string;
    companyId: string;
    permissionType: PermissionTypesEnum;
    isActive: boolean;
    editorInfo: IEditorInfo;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
  }): UserCompany {
    return new UserCompany(
      props.userId,
      props.companyId,
      props.permissionType,
      props.isActive,
      props.editorInfo,
      props.createdAt,
      props.updatedAt,
      props.deletedAt,
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
