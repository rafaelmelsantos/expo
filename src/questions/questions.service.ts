import { Inject, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto.js';
import { UpdateQuestionDto } from './dto/update-question.dto.js';
import { PrismaService } from '../database/prisma.service.js';

@Injectable()
export class QuestionsService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(createQuestionDto: CreateQuestionDto, req: any) {
    return await this.prisma.question.create({
      data: { ...createQuestionDto, userId: req.sub.sub },
    });
  }

  async findAll() {
  return await this.prisma.questions.findMany({
    include: {
      answers: true,
      user: true,
    },
  });
}

  async findOne(id: number) {
    return await this.prisma.question.findUnique({
      where: { id },
      include: {
      answers: true,
      user: {
      select: {
        name: true,
        email: true,
      },
    },
  }
    });
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return await this.prisma.question.update({
      where: { id },
      data:updateQuestionDto,
    });
  }

  remove(id: number) {
    return this.prisma.question.delete({
      where: { id },
    });
  }
}
