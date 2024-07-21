This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Test Environment

- Next.js 14
- TypeScript
- [chakra-ui v2](https://v2.chakra-ui.com/) (with [emotion](https://emotion.sh/docs/introduction), [chakra-ui-icons](https://v2.chakra-ui.com/docs/components/icon/usage))
- [react-calendar v4](https://github.com/wojtekmaj/react-calendar)
- [jsdiff](https://github.com/kpdecker/jsdiff)
- [diff-match-patch](https://github.com/JackuB/diff-match-patch)

## Check List

- [x] 캘린더 커스텀 가능 여부
- [x] 캘린더 날짜 선택 가능 여부
- [ ] diff view 커스텀 가능 여부
  - [x] jsdiff
  - [ ] ~~diff-match-patch~~ : 정확히 단어 단위로 diff 확인 불가능해보임
- [ ] diff 내에서 데이터 조작 가능 여부
  - [ ] jsdiff
  - [ ] ~~diff-match-patch~~
- [ ] chakra-ui / 필요한 컴포넌트 구현 가능 여부 확인
  - [x] 버튼
  - [x] 아이콘 (chakra-ui-icons은 지원하는 아이콘 수가 많지 않음)
  - [x] 텍스트
  - [x] 알림 아이콘
  - [x] drawer (사이드 메뉴)
  - [x] 알림 표시할 수 있을 컴포넌트
  - [x] 드롭다운
  - [x] 날짜 선택
  - [x] Editable 컴포넌트 확인
  - [x] 텍스트 꾸미기 (폰트 / 색상 / 크기 / weight) => 일괄 적용만 가능할 것 같음
- [x] 편지 이미지 생성 [react-to-image](https://github.com/hugocxl/react-to-image)
  - [x] 이미지 변환 가능 (png, jpeg, blob)
  - [x] 이미지 미리보기
  - [x] 이미지 다운로드
