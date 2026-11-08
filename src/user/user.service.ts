
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { User, Prisma } from '../generated/prisma/client.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  verify(authorizationHeader: string, p0: { secret: string | undefined; }) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // Buscar usuário
  async user(
    where: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where,
    });
  }

  // Criar usuário
  async createUser(
    //criptografar senha antes de salvar no banco
    data: Prisma.UserCreateInput,
  ): Promise<User> {
    const hashpassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      ...data, password: hashpassword
    });
  }

  // Atualizar usuário
  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;

    return this.prisma.user.update({
      where,
      data,
    });
  }

  // Deletar usuário
  async deleteUser(
    where: Prisma.UserWhereUniqueInput,
  ): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
