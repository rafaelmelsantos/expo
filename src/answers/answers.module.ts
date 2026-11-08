import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service.js';
import { AnswersController } from './answers.controller.js';
import { DatabaseModule } from '../database/database.module.js';

@Module({
  imports: [DatabaseModule],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
