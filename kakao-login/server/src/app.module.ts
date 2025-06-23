// 메인 모듈 - 모든 것을 연결
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    // 환경변수(.env) 전역 사용 설정
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // JWT 토큰 모듈 설정
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default-secret-key',
      signOptions: {
        expiresIn: '7d',
        issuer: 'kakao-auth-server',
      },
    }),
  ],

  // 컨트롤러들 (API 엔드포인트 담당)
  controllers: [
    AppController, // 기본 라우트 (/, /health)
    AuthController, // 인증 라우트 (/auth/*)
  ],

  // 서비스들 (비즈니스 로직 담당)
  providers: [
    AppService, // 기본 서비스
    AuthService, // 인증 서비스
  ],
})
export class AppModule {}
