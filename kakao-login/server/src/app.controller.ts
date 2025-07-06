// 기본 컨트롤러 - 헬스체크용
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 기본 라우트: GET /
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 헬스체크: GET /health
  @Get('health')
  getHealth() {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      message: '서버가 정상 작동중입니다',
    };
  }
}
