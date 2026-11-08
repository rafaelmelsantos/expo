
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import type { User } from '../generated/prisma/client.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // Buscar usuário
  async user(
  where: Prisma.UserWhereUniqueInput,
): Promise<Omit<User, 'password'> | null> {
  return this.prisma.user.findUnique({
    where,
    select: {
      id: true,
      name: true,
      email: true,
      cpf: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

  // Criar usuário
  async createUser(data: Prisma.UserCreateInput): Promise<User> { 
  //criptografar senha antes de salvar no banco
  const hashpassword = await bcrypt.hash(data.password, 10);
  return this.prisma.user.create({
    data: { ...data, password: hashpassword },
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
