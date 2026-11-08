import { Questions } from '../../generated/prisma/client.js';

export class Question implements Questions {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}