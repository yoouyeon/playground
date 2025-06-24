import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios, { AxiosError } from 'axios';

// 사용자 인터페이스 정의
interface User {
  id: string;
  nickname: string;
  provider: string;
  profileImage?: string;
  createdAt: string;
  lastLoginAt: string;
}

// 테스트용 메모리 저장소 (실제로는 데이터베이스 사용)
const users = new Map<string, User>();

interface KakaoTokenResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope?: string;
  refresh_token_expires_in: number;
}

interface KakaoUserInfo {
  id: number;
  connected_at: string;
  // NOTE - 필요한 경우 동의를 받아 추가 정보를 받아야 사용할 수 있다
  properties: {
    nickname: string;
    profile_image?: string;
  };
  kakao_account: {
    profile_nickname_needs_agreement: boolean;
    profile_image_needs_agreement: boolean;
    profile: {
      nickname: string;
      thumbnail_image_url?: string;
      profile_image_url?: string;
      is_default_image: boolean;
      is_default_nickname: boolean;
    };
  };
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly jwtService: JwtService) {}

  // 카카오 인가코드로 토큰 받기
  async getKakaoToken(code: string): Promise<KakaoTokenResponse> {
    // 디버깅용 로그 추가
    console.log('🔍 환경변수 체크:');
    console.log(
      'KAKAO_CLIENT_ID:',
      process.env.KAKAO_CLIENT_ID ? '✅ 존재' : '❌ 없음',
    );
    console.log(
      'KAKAO_CLIENT_SECRET:',
      process.env.KAKAO_CLIENT_SECRET ? '✅ 존재' : '❌ 없음',
    );
    console.log('KAKAO_REDIRECT_URI:', process.env.KAKAO_REDIRECT_URI);
    try {
      const response = await axios.post<KakaoTokenResponse>(
        'https://kauth.kakao.com/oauth/token',
        {
          grant_type: 'authorization_code',
          client_id: process.env.KAKAO_CLIENT_ID,
          client_secret: process.env.KAKAO_CLIENT_SECRET,
          redirect_uri: process.env.KAKAO_REDIRECT_URI,
          code: code,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          timeout: 10000, // 10초 타임아웃
        },
      );

      this.logger.log('✅ 카카오 토큰 받기 성공');
      return response.data;
    } catch (error) {
      this.logger.error('❌ 카카오 토큰 요청 실패');

      if (error instanceof AxiosError) {
        this.logger.error('카카오 API 에러:', error.response?.data);

        if (error.response?.status === 400) {
          throw new HttpException(
            '잘못된 인가코드이거나 만료되었습니다',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      throw new HttpException(
        '카카오 토큰 요청에 실패했습니다',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 카카오 사용자 정보 받기
  async getKakaoUserInfo(accessToken: string): Promise<KakaoUserInfo> {
    try {
      const response = await axios.get<KakaoUserInfo>(
        'https://kapi.kakao.com/v2/user/me',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          timeout: 10000,
        },
      );

      this.logger.log('✅ 카카오 사용자 정보 받기 성공');
      return response.data;
    } catch (error) {
      this.logger.error('❌ 카카오 사용자 정보 요청 실패');

      if (error instanceof AxiosError) {
        this.logger.error('카카오 API 에러:', error.response?.data);

        if (error.response?.status === 401) {
          throw new HttpException(
            '유효하지 않은 카카오 토큰입니다',
            HttpStatus.UNAUTHORIZED,
          );
        }
      }

      throw new HttpException(
        '카카오 사용자 정보 요청에 실패했습니다',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 사용자 등록/로그인 처리
  processUser(kakaoUser: KakaoUserInfo): User {
    try {
      const kakaoId = kakaoUser.id.toString();
      const nickname =
        kakaoUser.properties?.nickname ||
        kakaoUser.kakao_account?.profile?.nickname;

      // 기존 사용자 찾기
      let user = users.get(kakaoId);

      if (!user) {
        // 신규 사용자 - 회원가입
        user = {
          id: kakaoId,
          nickname: nickname,
          provider: 'kakao',
          profileImage: kakaoUser.properties?.profile_image,
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
        };

        users.set(kakaoId, user);
        this.logger.log(`✅ 신규 사용자 회원가입: ${user.nickname}`);
      } else {
        // 기존 사용자 - 로그인 시간 업데이트
        user.nickname = nickname; // 닉네임 업데이트
        user.lastLoginAt = new Date().toISOString();
        users.set(kakaoId, user);
        this.logger.log(`✅ 기존 사용자 로그인: ${user.nickname}`);
      }

      // 현재 저장된 사용자 수 로그
      this.logger.log(`📊 현재 등록된 사용자 수: ${users.size}`);

      return user;
    } catch (error) {
      this.logger.error('❌ 사용자 처리 중 에러:', (error as Error).message);
      throw error;
    }
  }

  // JWT 토큰 생성
  generateTokens(user: User): { accessToken: string; refreshToken: string } {
    try {
      const payload = {
        sub: user.id,
        nickname: user.nickname,
        provider: user.provider,
        iat: Math.floor(Date.now() / 1000), // 발급 시간
      };

      const accessToken = this.jwtService.sign(payload, {
        expiresIn: '7d',
        // subject: user.id,
      });

      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: '30d',
        // subject: user.id,
      });

      this.logger.log('✅ JWT 토큰 생성 완료');
      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('❌ JWT 토큰 생성 실패:', (error as Error).message);
      throw new HttpException(
        'JWT 토큰 생성에 실패했습니다',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 디버깅용: 저장된 사용자 목록 조회
  getAllUsers(): User[] {
    return Array.from(users.values());
  }

  // 디버깅용: 특정 사용자 조회
  getUserById(id: string): User | undefined {
    return users.get(id);
  }

  // 카카오 로그아웃 API 호출 (서비스 앱 어드민 키 방식)
  async logoutFromKakao(userId: string): Promise<void> {
    try {
      await axios.post(
        'https://kapi.kakao.com/v1/user/logout',
        {
          target_id_type: 'user_id',
          target_id: userId,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            Authorization: `KakaoAK ${process.env.KAKAO_ADMIN_KEY}`,
          },
          timeout: 10000,
        },
      );

      this.logger.log('✅ 카카오 로그아웃 성공');
    } catch (error) {
      this.logger.error('❌ 카카오 로그아웃 실패');

      if (error instanceof AxiosError) {
        this.logger.error('카카오 API 에러:', error.response?.data);

        // 사용자가 이미 로그아웃된 경우는 무시
        if (error.response?.status === 400) {
          this.logger.log('사용자가 이미 로그아웃되어 처리 완료');
          return;
        }
      }

      // 카카오 로그아웃 실패해도 서비스 로그아웃은 계속 진행
      this.logger.warn(
        '카카오 로그아웃 실패했지만 서비스 로그아웃은 계속 진행합니다',
      );
    }
  }
}
