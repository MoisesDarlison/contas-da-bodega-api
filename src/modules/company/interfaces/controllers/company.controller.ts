import { Body, Controller, Post } from '@nestjs/common';
import { CreateCompanyUseCase } from '../../use-cases/create-company.usecase';
import { CreateCompanyDto } from './dtos/create-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly createUseCase: CreateCompanyUseCase) {}

  @Post('create')
  async create(@Body() dto: CreateCompanyDto) {
    const person = await this.createUseCase.execute(dto);
    return person;
  }
}
