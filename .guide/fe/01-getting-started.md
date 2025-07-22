---
title: Getting Started
---

## 개발 Stack

- [node.js@lts](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [React@^19](https://react.dev/)
- [React Router@^7](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Axios](https://axios-http.com/)
- [React Query@^5](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Styled Components](https://styled-components.com/)
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [MSW](https://mswjs.io/)

## 준비사항

### node.js 설치

> lts 버전 권장

- [node.js 설치 가이드](https://nodejs.org/en/download/)

### pnpm 설치

> node.js (npm) lts 설치 이후

```bash
npm install -g pnpm
```

### pnpm install

```bash
pnpm install
```

### pnpm dev

```bash
pnpm dev
```

## Tooling

```bash
# 코드 스타일 검사
pnpm lint
# 코드 스타일 자동 수정
pnpm lint:fix
# 코드 포맷 검사
pnpm format:check
# 코드 포맷 자동 수정
pnpm format:write
```

## Test

```bash
# 테스트 실행
pnpm test
# 테스트 커버리지 확인
pnpm test:coverage
```

## build

```bash
# 빌드
pnpm build
# 빌드 결과 확인
pnpm preview
```
