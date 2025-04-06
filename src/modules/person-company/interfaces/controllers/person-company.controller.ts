import { Body, Controller, Post } from '@nestjs/common';
import { AssignPersonToCompanyUseCase } from '../../application/use-cases/assign-person-to-company.usecase';
import { AssignPersonCompanyDto } from '../dtos/assign-person-company.dto';

@Controller('person-company')
export class PersonCompanyController {
  constructor(private readonly assignUseCase: AssignPersonToCompanyUseCase) {}

  @Post('assign')
  async assign(@Body() dto: AssignPersonCompanyDto) {
    await this.assignUseCase.execute(dto.personId, dto.companyId);
    return { message: 'Person assigned to company successfully' };
  }
}
