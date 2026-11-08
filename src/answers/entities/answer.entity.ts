import { Answers, User } from '../../generated/prisma/client.js';
import { Question } from '../../questions/entities/question.entity.js';

export class Answer implements Answers {
  id: number;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  questionId: number;
  user: User;
  question: Question;
}