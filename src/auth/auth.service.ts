// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(
    username: string,
    password: string,
    info1: string,
    info2: string,
  ): Promise<any> {
    const hashedPassword = bcrypt.hashSync(password, 10);
    return this.usersService.create(username, hashedPassword, info1, info2);
  }
}

// 회원가입 및 로그인 코드
