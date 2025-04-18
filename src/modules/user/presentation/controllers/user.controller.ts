import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';
import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';
import { FindAllUsersUseCase } from '../../application/use-cases/find-all-user.usecase';
import { CreateRequestUserDto } from '../dtos/create-user.dto';
import { FindAllQueryUserDto } from '../dtos/find-all-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUseCase: CreateUserUseCase,
    private readonly findAllUseCase: FindAllUsersUseCase,
  ) {}

  @Post('create')
  async create(@Body() body: CreateRequestUserDto) {
    return await this.createUseCase.execute(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() query: FindAllQueryUserDto) {
    const { page = 1, limit = 10 } = query;
    return await this.findAllUseCase.execute({ page, limit });
  }
}
