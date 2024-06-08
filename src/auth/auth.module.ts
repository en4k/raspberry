// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule],
  providers: [AuthService],
  controllers: [],
  exports: [AuthService],
})
export class AuthModule {}

// 로그인 모듈
