import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePersonUseCase } from '../../application/use-cases/create-person.usecase';
import { FindAllPersonUseCase } from '../../application/use-cases/find-all-person.usecase';
import { CreatePersonDto } from './dtos/create-person.dto';

@Controller('person')
export class PersonController {
  constructor(
    private readonly createUseCase: CreatePersonUseCase,
    private readonly findAllUseCase: FindAllPersonUseCase,
  ) {}

  @Post('create')
  async create(@Body() dto: CreatePersonDto) {
    const person = await this.createUseCase.execute(dto);
    return person;
  }

  @Get()
  async findAll() {
    return await this.findAllUseCase.execute();
  }
}
