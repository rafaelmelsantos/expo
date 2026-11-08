import { Inject, Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto.js';
import { UpdateAnswerDto } from './dto/update-answer.dto.js';
import { PrismaService } from '../database/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class AnswersService {
  @Inject()
  private readonly prisma: PrismaService;

  create(createAnswerDto: CreateAnswerDto, userId: any, questionId: number) {
    const newAnswers = {
      body: createAnswerDto.body,
      user: { connect: { id: userId.sub } },
      question: { connect: { id: questionId } },
    };
    return this.prisma.answers.create({
      data: newAnswers,
    });
  }

  findAll() {
    return this.prisma.questions.findMany();
  }

  findOne(id: number) {
    return this.prisma.questions.findUnique({
      where: { id },
    });
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return this.prisma.questions.update({
      where: { id },
      data: updateAnswerDto,
    });
  }

  remove(id: number) {
    return this.prisma.questions.delete({
      where: { id },
    });
  }
}
