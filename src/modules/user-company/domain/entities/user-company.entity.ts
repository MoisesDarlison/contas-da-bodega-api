import { PermissionTypesEnum } from 'src/shared/domain/enums/permission-types.enum';
interface IEditorInfo {
  userid: string;
  updatedAt: Date;
}

export class UserCompany {
  private constructor(
    private readonly userId: string,
    private readonly companyId: string,
    private isActive: boolean,
    private editorInfo: IEditorInfo,
    private readonly createdAt: Date,
    private updatedAt: Date,
    private permissionType?: PermissionTypesEnum,
    private deletedAt?: Date | null,
  ) {}

  static create(input: {
    userId: string;
    companyId: string;
    editorId: string;
    permissionType?: PermissionTypesEnum;
  }): UserCompany {
    const now = new Date();
    return new UserCompany(
      input.userId,
      input.companyId,
      true,
      { userid: input.editorId, updatedAt: now },
      now,
      now,
      input.permissionType || PermissionTypesEnum.EMPLOYEE,
    );
  }

  static clone(props: {
    userId: string;
    companyId: string;
    isActive: boolean;
    editorInfo: IEditorInfo;
    createdAt: Date;
    updatedAt: Date;
    permissionType?: PermissionTypesEnum;
    deletedAt?: Date | null;
  }): UserCompany {
    return new UserCompany(
      props.userId,
      props.companyId,
      props.isActive,
      props.editorInfo,
      props.createdAt,
      props.updatedAt,
      props.permissionType,
      props.deletedAt,
    );
  }

  getUserId(): string {
    return this.userId;
  }

  getCompanyId(): string {
    return this.companyId;
  }

  toObject() {
    return {
      userId: this.userId,
      companyId: this.companyId,
      isActive: this.isActive,
      editorInfo: this.editorInfo,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      permissionType: this.permissionType,
    };
  }

  private touch(): void {
    this.updatedAt = new Date();
  }
}
