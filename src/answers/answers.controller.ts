import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AnswersService } from './answers.service.js';
import { CreateAnswerDto } from './dto/create-answer.dto.js';
import { UpdateAnswerDto } from './dto/update-answer.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post(':questionId')
  @UseGuards(AuthGuard)
  create(
    @Body() createAnswerDto: CreateAnswerDto,
    @Request() req: { sub: number },
    @Param('questionId') questionId: string,
  ) {
    return this.answersService.create(createAnswerDto, req.sub, Number(questionId));
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.answersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.answersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answersService.update(+id, updateAnswerDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.answersService.remove(+id);
  }
}
