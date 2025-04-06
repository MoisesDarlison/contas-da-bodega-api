import { Body, Controller, Post } from '@nestjs/common';
import { CreatePersonUseCase } from '../../application/use-cases/create-person.usecase';
import { CreatePersonDto } from './dtos/create-person.dto';

@Controller('person')
export class PersonController {
  constructor(private readonly createUseCase: CreatePersonUseCase) {}

  @Post('create')
  async create(@Body() dto: CreatePersonDto) {
    const person = await this.createUseCase.execute(dto);
    return person;
  }
}
