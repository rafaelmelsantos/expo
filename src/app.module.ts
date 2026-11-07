import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module.js';
import { DatabaseModule } from './database/database.module.js';
import { UserModule } from './user/user.module.js';

@Module({
  imports: [AuthModule, DatabaseModule, UserModule]
})
export class AppModule {}
