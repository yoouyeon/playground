# 카카오 로그인

카카오 로그인 기능 확인을 위한 연습용 프로젝트입니다.

## 프로젝트 구성

```
kakao-login/
├── client/          # React 클라이언트 (포트: 5173)
├── server/          # NestJS 서버 (포트: 3001)
└── README.md        # 프로젝트 개요
```

## 시작하기

### 1. 의존성 설치

```bash
yarn install:all
```

### 2. 환경변수 설정

- [클라이언트 환경변수 설정](./client/README.md#2-환경변수-설정)
- [서버 환경변수 설정](./server/README.md#2-환경변수-설정)

### 3. 개발 서버 실행

```bash
yarn dev
```

## 상세 문서

- [클라이언트 README](./client/README.md)
- [서버 README](./server/README.md)

## 로그인/로그아웃 플로우

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
