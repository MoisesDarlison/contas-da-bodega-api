import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { PermissionTypesEnum } from 'src/shared/enums/permission-types.enum';
import { GetCompaniesByPersonIdUseCase } from '../../application/use-cases/get-companies-by-person-id.usecase';
import { GetPersonsByCompanyIdUseCase } from '../../application/use-cases/get-persons-by-company-id.usecase';
import { LinkPersonToCompanyUseCase } from '../../application/use-cases/link-person-to-company.usecase';

@Controller('person-company')
export class PersonCompanyController {
  constructor(
    private readonly linkPersonToCompany: LinkPersonToCompanyUseCase,
    private readonly getCompaniesByPerson: GetCompaniesByPersonIdUseCase,
    private readonly getPersonsByCompany: GetPersonsByCompanyIdUseCase,
  ) {}

  @Post('assign')
  async link(
    @Body()
    body: {
      personId: string;
      companyId: string;
      permissionType: PermissionTypesEnum;
    },
  ) {
    await this.linkPersonToCompany.execute(body);
    return { message: 'Link created successfully' };
  }

  @Get('person/:id')
  async getCompanies(@Param('id') personId: string) {
    const result = await this.getCompaniesByPerson.execute(personId);
    return result;
  }

  @Get('company/:id')
  async getPersons(@Param('id') companyId: string) {
    const result = await this.getPersonsByCompany.execute(companyId);
    return result;
  }
}
