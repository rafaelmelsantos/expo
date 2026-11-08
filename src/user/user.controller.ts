import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { PrismaClient, Prisma } from '../generated/prisma/client.js';
import { UserService } from './user.service.js';
import { UserModel } from '../generated/prisma/models.js';
import { AuthGuard } from '../auth/auth.guard.js';

//rota principal
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  //rota para criar usuário
  @Post()
  async create(@Body() userData: Prisma.UserCreateInput): Promise<UserModel> {
    return this.usersService.createUser(userData);
  }

  //rota para buscar usuário por id
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserModel | null> {
    return this.usersService.user({ id: Number(id) });
  }

  //rota para atualizar usuário por id
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userData: Prisma.UserUpdateInput,
  ): Promise<UserModel> {
    return this.usersService.updateUser({
      where: { id: Number(id) },
      data: userData,
    });
  }

  //rota para deletar usuário por id
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
    return this.usersService.deleteUser({ id });
  }
}
