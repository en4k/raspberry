// src/users/users.controller.ts

import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async register(
    @Body()
    body: { username: string; password: string; info1: string; info2: string },
    @Res() res: Response,
  ) {
    try {
      await this.authService.register(
        body.username,
        body.password,
        body.info1,
        body.info2,
      );
      return res
        .status(HttpStatus.CREATED)
        .json({ message: '회원가입에 성공했습니다.' });
    } catch (error: any) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
    @Res() res: Response,
  ) {
    try {
      const user = await this.authService.validateUser(
        body.username,
        body.password,
      );
      if (user) {
        return res
          .status(HttpStatus.OK)
          .json({ message: '로그인에 성공했습니다.', user });
      } else {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message:
            '로그인에 실패했습니다. 잘못된 사용자 이름 또는 비밀번호입니다.',
        });
      }
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: '로그인에 실패했습니다.' });
    }
  }
}

// 유저
