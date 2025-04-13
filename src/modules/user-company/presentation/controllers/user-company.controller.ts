import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth/jwt-auth.guard';
import { GetCompaniesByUserIdUseCase } from '../../application/use-cases/get-companies-by-user-id.usecase';
import { GetUserByCompanyIdUseCase } from '../../application/use-cases/get-user-by-company-id.usecase';
import { LinkUserToCompanyUseCase } from '../../application/use-cases/link-user-to-company.usecase';
import {
  LinkUserToCompanyDto,
  LinkUserToCompanyResponseDto,
} from '../dtos/link-user-company.dto';

@Controller('user-company')
export class UserCompanyController {
  constructor(
    private readonly linkUserToCompany: LinkUserToCompanyUseCase,
    private readonly getCompaniesByUser: GetCompaniesByUserIdUseCase,
    private readonly getUsersByCompany: GetUserByCompanyIdUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('assign')
  async link(
    @Body() body: LinkUserToCompanyDto,
  ): Promise<LinkUserToCompanyResponseDto> {
    await this.linkUserToCompany.execute(body);
    return { message: 'Link created successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  async getCompanies(@Param('id') userId: string) {
    return await this.getCompaniesByUser.execute(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('company/:id')
  async getUsers(@Param('id') companyId: string) {
    return await this.getUsersByCompany.execute(companyId);
  }
}
