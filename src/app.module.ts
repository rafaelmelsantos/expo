import { Module, ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth/auth.module.js';
import { DatabaseModule } from './database/database.module.js';
import { UserModule } from './user/user.module.js';
import { QuestionsModule } from './questions/questions.module.js';
import { AnswersModule } from './answers/answers.module.js';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';

@Module({
  imports: [AuthModule, DatabaseModule, UserModule, QuestionsModule, AnswersModule],
  providers:[{provide: APP_PIPE , useClass: ValidationPipe}]
})
export class AppModule {}
