import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePersonUseCase } from '../../application/use-cases/create-person.usecase';
import { CreatePersonDto } from './dtos/create-person.dto';
import { Person } from '../../domain/entities/person.entity';
import { FindAllPersonUseCase } from '../../application/use-cases/find-all-person.usecase';

@Controller('person')
export class PersonController {
  constructor(
    private readonly createUseCase: CreatePersonUseCase,
    private readonly findAllPersonUseCase: FindAllPersonUseCase,
  ) {}

  @Post('create')
  async create(@Body() dto: CreatePersonDto) {
    const person = await this.createUseCase.execute(dto);
    return person;
  }

  @Get()
  async findAll(): Promise<Person[]> {
    return await this.findAllPersonUseCase.execute();
  }
}
