import { User as PrismaUser } from '../../generated/prisma/client.js';

export class User implements PrismaUser {
  cpf: string;
  id: number;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}