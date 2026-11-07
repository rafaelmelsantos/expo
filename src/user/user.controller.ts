import { Body, Controller, Post } from '@nestjs/common';
import { PrismaClient, Prisma } from '../generated/prisma/client.js';
import { UserService } from './user.service.js';
import { UserModel } from '../generated/prisma/models.js';

@Controller('user')
export class UserController {
    constructor(private readonly usersService: UserService) {}
    
    @Post('signup')
  async create(
    @Body() userData: Prisma.UserCreateInput,
  ): Promise<UserModel> {
    return this.usersService.createUser(userData);
  }
}
