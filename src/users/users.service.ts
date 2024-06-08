// src/users/users.service.ts

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(
    username: string,
    password: string,
    info1: string,
    info2: string,
  ): Promise<User> {
    const userCount = await this.usersRepository.count({
      where: { username },
    });

    if (userCount) {
      throw new BadRequestException({ message: '중복되는 아이디입니다.' });
    }

    // 회원가입 중복아이디 로직
    const user = this.usersRepository.create({
      username,
      password,
      info1,
      info2,
    });
    return this.usersRepository.save(user);
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }
}
