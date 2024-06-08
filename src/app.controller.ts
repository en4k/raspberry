// src/app.controller.ts
import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return { message: 'Hello, World!', title: 'NestJS EJS Example' };
  }
  @Get('register')
  @Render('register')
  getTest() {
    return { message: 'Hello, World!', title: 'NestJS EJS Example' };
  }
}
