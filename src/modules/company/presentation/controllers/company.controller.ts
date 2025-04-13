import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth/jwt-auth.guard';
import { CreateCompanyUseCase } from '../../application/use-cases/create-company.usecase';
import { FindAllCompanyUseCase } from '../../application/use-cases/find-all-company.usecase';
import { CreateCompanyBodyDto } from '../dtos/create-company.dto';
import { FindAllCompanyQueryDto } from '../dtos/find-all-company.dto';

@Controller('company')
export class CompanyController {
  constructor(
    private readonly createUseCase: CreateCompanyUseCase,
    private readonly findAllUseCase: FindAllCompanyUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() body: CreateCompanyBodyDto) {
    return await this.createUseCase.execute(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() query: FindAllCompanyQueryDto) {
    const { page = 1, limit = 10 } = query;
    return await this.findAllUseCase.execute({ page, limit });
  }
}
