// 기본 서비스
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '🚀 카카오 OAuth 서버가 정상 작동중입니다!';
  }
}
