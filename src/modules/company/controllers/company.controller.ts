import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCompanyUseCase } from '../application/use-cases/create-company.usecase';
import { FindAllCompanyUseCase } from '../application/use-cases/find-all-company.usecase';
import { CreateCompanyDto } from './dtos/create-company.dto';

@Controller('company')
export class CompanyController {
  constructor(
    private readonly createUseCase: CreateCompanyUseCase,
    private readonly findAllUseCase: FindAllCompanyUseCase,
  ) {}

  @Post('create')
  async create(@Body() dto: CreateCompanyDto) {
    const person = await this.createUseCase.execute(dto);
    return person;
  }

  @Get()
  async findAll() {
    return await this.findAllUseCase.execute();
  }
}
