import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserModel } from '../generated/prisma/models.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { CreateUserDto } from './dto/createUser.dto.js';
import { UpdateUserDto } from './dto/updateUser.dto.js';

//rota principal
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  //rota para criar usuário
  @Post()
  async create(
    @Body(new ValidationPipe()) CreateUserDto: CreateUserDto): Promise<UserModel> {
    return this.usersService.createUser(CreateUserDto);
  }

  //rota para buscar usuário por id
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Omit<UserModel, 'password'> | null> {
    return this.usersService.user({ id });
  }

  //rota para atualizar usuário por id
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id',ParseIntPipe) id: number,
    @Body(new ValidationPipe()) userData: UpdateUserDto,
  ): Promise<UserModel> {
    return this.usersService.updateUser({
      where: { id },
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
