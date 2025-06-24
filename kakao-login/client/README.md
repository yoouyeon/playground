# React + TypeScript + Vite

[카카오 로그인 프로세스](https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#kakaologin)를 테스트하기 위한 클라이언트입니다.

## 실행시키기

### 1. 의존성 설치

```bash
yarn install
```

### 2. 환경변수 설정

프로젝트 root에 `.env.development` 파일을 생성하고 아래 내용을 추가해주세요.

```env
VITE_KAKAO_CLIENT_ID=your_kakao_client_id
VITE_KAKAO_REDIRECT_URI=http://localhost:3001/auth/kakao/callback
VITE_API_BASE_URL=http://localhost:3001
```

### 3. 개발 서버 실행

```bash
yarn dev
```

## 테스트한 내용

- **카카오 로그인/로그아웃 플로우**
- **쿠키를 활용한 토큰 관리**
- **Context를 활용한 전역 인증 상태 관리**
- **인증된 사용자만 접근 가능한 Protected Route**

## 프로젝트 구조

```
src/
├── api/               # API 클라이언트 및 사용자 API
├── assets/            # 에셋(이미지 등)
├── context/           # 인증 상태 관리(Context API)
├── layout/            # 공통 레이아웃 컴포넌트
├── pages/
│   ├── home/          # 홈(로그인 후) 페이지
│   └── login/         # 로그인 페이지
├── router/            # 라우터 및 인증 가드
├── App.tsx            # 앱 엔트리포인트
└── main.tsx           # React DOM 렌더링
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
