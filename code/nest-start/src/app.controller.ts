import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() //데코레이터: 기능 추가
export class AppController {
  constructor(private readonly appService: AppService) {} //의존성 주입

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
