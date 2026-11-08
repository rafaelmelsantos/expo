import { PartialType } from '@nestjs/mapped-types';
import { CreateAnswerDto } from './create-answer.dto.js';

export class UpdateAnswerDto extends PartialType(CreateAnswerDto) {}
