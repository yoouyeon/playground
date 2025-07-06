import { Controller, Get, Post, Query, Res, Logger, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  // 카카오 콜백: GET /auth/kakao/callback?code=인가코드
  @Get('kakao/callback')
  async kakaoCallback(
    @Query('code') code: string,
    @Query('error') error: string,
    @Res() res: Response,
  ) {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    try {
      // 카카오에서 에러가 온 경우
      if (error) {
        this.logger.error(`카카오 인증 에러: ${error}`);
        return res.redirect(`${frontendUrl}/login?error=kakao_auth_failed`);
      }

      // 인가코드가 없는 경우
      if (!code) {
        this.logger.error('인가코드가 없습니다');
        return res.redirect(`${frontendUrl}/login?error=no_authorization_code`);
      }

      this.logger.log('✅ 1단계: 카카오 인가코드 받음');

      // 2단계: 카카오 토큰 받기
      this.logger.log('✅ 2단계: 카카오 토큰 요청 시작');
      const kakaoTokens = await this.authService.getKakaoToken(code);

      // 3단계: 카카오 사용자 정보 받기
      this.logger.log('✅ 3단계: 카카오 사용자 정보 요청 시작');
      const kakaoUser = await this.authService.getKakaoUserInfo(
        kakaoTokens.access_token,
      );

      // 4단계: 사용자 등록/로그인 처리
      this.logger.log('✅ 4단계: 회원가입/로그인 처리');
      const user = this.authService.processUser(kakaoUser);

      // 5단계: JWT 토큰 생성
      this.logger.log('✅ 5단계: JWT 토큰 생성');
      const tokens = this.authService.generateTokens(user);

      // 6단계: 쿠키 설정
      this.logger.log('✅ 6단계: 보안 쿠키 설정');
      this.setSecureCookies(res, tokens);

      // 7단계: 프론트엔드로 리다이렉트
      this.logger.log('✅ 7단계: 프론트엔드로 리다이렉트');
      return res.redirect(`${frontendUrl}`);
    } catch (error) {
      this.logger.error(
        '❌ 카카오 로그인 처리 중 에러:',
        (error as Error).message,
      );

      // 에러 타입에 따른 구체적인 메시지
      let errorMessage = 'login_failed';
      const errorMsg = (error as Error).message;
      if (errorMsg.includes('토큰')) {
        errorMessage = 'token_exchange_failed';
      } else if (errorMsg.includes('사용자 정보')) {
        errorMessage = 'user_info_failed';
      }

      return res.redirect(`${frontendUrl}/login?error=${errorMessage}`);
    }
  }

  // 로그아웃: POST /auth/logout
  @Post('logout')
  async logoutPost(@Req() req: Request, @Res() res: Response) {
    try {
      this.logger.log('로그아웃 요청 시작');

      // 1단계: 서비스 액세스 토큰에서 사용자 ID 추출
      const accessToken = req.cookies?.accessToken as string;
      let userId: string | null = null;

      if (accessToken) {
        try {
          // JWT 토큰 검증 및 사용자 ID 추출
          const payload = this.jwtService.verify<{ sub: string }>(accessToken);
          userId = payload?.sub;

          if (userId) {
            // 2단계: 카카오 로그아웃 API 호출 (서비스 앱 어드민 키 방식)
            this.logger.log(
              `카카오 로그아웃 API 호출 시작: 사용자 ID ${userId}`,
            );
            await this.authService.logoutFromKakao(userId);
          }
        } catch (jwtError) {
          this.logger.warn(
            'JWT 토큰 검증 실패, 카카오 로그아웃 건너뜀:',
            jwtError,
          );
        }
      } else {
        this.logger.log('액세스 토큰이 없어 카카오 로그아웃 건너뜀');
      }

      // 3단계: 서비스 쿠키 삭제
      this.logger.log('서비스 쿠키 삭제');
      this.clearSecureCookies(res);

      // 4단계: 성공 응답 반환
      this.logger.log('로그아웃 성공');
      return res.status(200).json({
        message: '로그아웃 성공',
      });
    } catch (error) {
      this.logger.error('로그아웃 처리 중 에러:', error);

      // 에러가 발생해도 쿠키는 삭제
      this.clearSecureCookies(res);

      // 성공 응답 반환
      return res.status(200).json();
    }
  }

  // 쿠키 설정 헬퍼 메서드
  private setSecureCookies(
    res: Response,
    tokens: { accessToken: string; refreshToken: string },
  ) {
    const isProduction = process.env.NODE_ENV === 'production';

    // Access Token 쿠키
    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true, // JavaScript 접근 차단 (XSS 방지)
      secure: isProduction, // HTTPS에서만 전송 (배포시)
      sameSite: isProduction ? 'none' : 'lax', // 배포시 CSRF 방지
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
      path: '/', // 모든 경로에서 사용
    });

    // Refresh Token 쿠키
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax', // 배포시 CSRF 방지
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30일
      path: '/',
    });
  }

  private clearSecureCookies(res: Response) {
    const isProduction = process.env.NODE_ENV === 'production';

    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      path: '/',
    });

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      path: '/',
    });
  }

  // 현재 로그인한 유저 정보 반환: GET /auth/user
  @Get('user')
  getUser(@Req() req: Request, @Res() res: Response) {
    try {
      const accessToken = req.cookies?.accessToken as string;
      if (!accessToken) {
        return res.status(401).json({ message: 'No access token' });
      }
      // accessToken 검증
      let payload: { sub: string };
      try {
        payload = this.jwtService.verify<{ sub: string }>(accessToken);
      } catch {
        return res.status(401).json({ message: 'Invalid access token' });
      }
      if (!payload?.sub) {
        return res.status(401).json({ message: 'Invalid token payload' });
      }
      // 유저 정보 조회
      const user = this.authService.getUserById(payload.sub);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      // 프론트에서 필요한 정보만 반환
      return res.json({
        id: user.id,
        nickname: user.nickname,
        profileImage: user.profileImage,
      });
    } catch (error) {
      this.logger.error('유저 정보 반환 중 에러:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
