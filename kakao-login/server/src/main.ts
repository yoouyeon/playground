// 서버 시작점
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // 쿠키 파싱 미들웨어
    app.use(cookieParser());

    // CORS 설정 (프론트엔드와 통신하기 위해)
    app.enableCors({
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      credentials: true, // 쿠키 전송 허용
    });

    const port = process.env.PORT || 3001;
    await app.listen(port);

    console.log(`🚀 서버가 http://localhost:${port}에서 실행중입니다`);
    console.log(
      `🌐 프론트엔드: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`,
    );
  } catch (error) {
    console.error('❌ 서버 시작 실패:', error);
    process.exit(1);
  }
}

bootstrap().catch((error) => {
  console.error('❌ 부트스트랩 실패:', error);
  process.exit(1);
});
