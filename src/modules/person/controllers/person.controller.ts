import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreatePersonUseCase } from '../application/use-cases/create-person.usecase';
import { FindAllPersonUseCase } from '../application/use-cases/find-all-person.usecase';
import { CreateRequestPersonDto } from './dtos/create-person.dto';
import { FindAllQueryPersonDto } from './dtos/find-all-person.dto';

@Controller('person')
export class PersonController {
  constructor(
    private readonly createUseCase: CreatePersonUseCase,
    private readonly findAllPersonUseCase: FindAllPersonUseCase,
  ) {}

  @Post('create')
  async create(@Body() body: CreateRequestPersonDto) {
    const person = await this.createUseCase.execute(body);
    return person;
  }

  @Get()
  async findAll(@Query() query: FindAllQueryPersonDto) {
    const { page = 1, limit = 10 } = query;
    return await this.findAllPersonUseCase.execute({ page, limit });
  }
}
