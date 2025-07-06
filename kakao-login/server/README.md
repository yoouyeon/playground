# 카카오 로그인 서버

> [!WARNING]  
> [Claude](https://claude.ai/)로 작성된 카카오 로그인 테스트용 서버입니다. 보안상 문제가 있을 수 있습니다.

## 실행시키기

### 1. 의존성 설치

```bash
yarn install
```

### 2. 환경변수 설정

프로젝트 root에 `.env` 파일을 생성하고 아래 내용을 추가해주세요.

```env
# 1. 환경 설정
NODE_ENV=development

# 2. 카카오 API 설정 (모두 필수)
KAKAO_CLIENT_ID=your_kakao_client_id
KAKAO_CLIENT_SECRET=your_kakao_client_secret
KAKAO_REDIRECT_URI=http://localhost:3001/auth/kakao/callback
KAKAO_ADMIN_KEY=your_kakao_admin_key

# 3. JWT 보안 설정 (필수)
JWT_SECRET=your_very_secure_jwt_secret_key

# 4. 서버 설정
PORT=3001
FRONTEND_URL=http://localhost:5173
```

### 3. 개발 서버 실행

```bash
yarn start:dev
```

## 테스트한 내용

- **카카오 로그인/로그아웃 플로우**
- **액세스 토큰과 리프레시 토큰 생성과 검증**
- **쿠키를 활용한 토큰 관리**: HttpOnly, Secure 쿠키
- **CORS 설정**
- **간단한 인메모리 사용자 데이터 관리**

## 프로젝트 구조

```
src/
├── app.controller.ts         # 기본 컨트롤러
├── app.module.ts             # 메인 애플리케이션 모듈
├── app.service.ts            # 기본 서비스
├── auth.controller.ts        # 인증 관련 엔드포인트
├── auth.service.ts           # 인증 비즈니스 로직
└── main.ts                   # 애플리케이션 진입점
```

## 로그인 플로우

```mermaid
---
config:
  look: handDrawn
  theme: neutral
---
sequenceDiagram
    participant User as 사용자
    participant Client as 서비스 클라이언트
    participant Server as 서비스 서버
    participant Kakao as 카카오 API 서버
    rect rgb(255,235,235)
    Note over User, Kakao: 카카오 인가 코드 받기
    User ->> Client : 카카오 로그인 버튼 클릭
    activate User
    activate Client
    Client ->> Kakao : 인가 코드 받기 요청
    deactivate Client
    activate Kakao
    Note over Client,Kakao: GET https://kauth.kakao.com/oauth/authorize
    Kakao ->> Client : 카카오계정 로그인 요청
    Client ->> Kakao : 카카오계정 로그인
    Kakao ->> Server : 인가 코드와 함께 리다이렉트
    deactivate Kakao
    activate Server
    Note over Server,Kakao: GET /auth/kakao/callback?code=인가코드
    end
    rect rgb(255,243,205)
    Note over User, Kakao: 카카오 토큰 받기
    Server ->> Kakao: 인가 코드로 토큰 요청
    activate Kakao
    Kakao ->> Server: 토큰 발급
    deactivate Kakao
    end
    rect rgb(212,237,218)
    Note over User, Kakao: 서비스 로그인/회원가입
    Server ->> Kakao: 사용자 정보 요청
    activate Kakao
    Note over Server, Kakao: GET https://kapi.kakao.com/v2/user/me
    Kakao ->> Server: 사용자 정보
    deactivate Kakao
    Server ->> Server: 서비스 회원가입 OR 로그인
    Server ->> Server: 쿠키에 토큰 설정
    Server ->> Client: 홈으로 리다이렉트
    activate Client
    deactivate Server
    end
    rect rgb(235,245,255)
    Note over User, Kakao: 로그인 Context 설정
    Client ->> Server: 사용자 정보 API 호출
    activate Server
    Note Over Client, Server: GET /auth/user
    Server ->> Client: 사용자 정보 반환
    deactivate Server
    Client ->> Client: 인증 상태 업데이트
    Client ->> User: 홈 화면 이동
    deactivate Client
    deactivate User
    end
    rect rgb(230,230,255)
    Note over User, Kakao: 로그아웃
    User ->> Client : 로그아웃 버튼 클릭
    activate User
    activate Client
    Client ->> Server: 로그아웃 API 호출
    activate Server
    Note over Client, Server: POST /auth/logout
    Server ->> Kakao: 카카오 로그아웃
    activate Kakao
    Note over Server, Kakao: POST https://kapi.kakao.com/v1/user/logout
    Kakao ->> Server: 카카오 토큰 만료
    deactivate Kakao
    Server ->> Server: 서비스 토큰 만료/쿠키 삭제
    Server ->> Client: 로그아웃
    deactivate Server
    Client ->> User : 로그인 페이지로 이동
    deactivate Client
    deactivate User
    end
```
