import { PermissionTypesEnum } from 'src/shared/enums/permission-types.enum';

export class PersonCompany {
  private constructor(
    private readonly personId: string,
    private readonly companyId: string,
    private permissionType: PermissionTypesEnum,
    private readonly createdAt: Date,
    private updatedAt: Date,
  ) {}

  static create(input: {
    personId: string;
    companyId: string;
    permissionType: PermissionTypesEnum;
  }): PersonCompany {
    const now = new Date();
    return new PersonCompany(
      input.personId,
      input.companyId,
      input.permissionType,
      now,
      now,
    );
  }

  static clone(props: {
    personId: string;
    companyId: string;
    permissionType: PermissionTypesEnum;
    createdAt: Date;
    updatedAt: Date;
  }): PersonCompany {
    return new PersonCompany(
      props.personId,
      props.companyId,
      props.permissionType,
      props.createdAt,
      props.updatedAt,
    );
  }

  getPersonId(): string {
    return this.personId;
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
