---
title: Folder Structure
---

- [개요](#개요)
- [pages 폴더](#pages-폴더)
  - [구조 예시](#예시-구조)
  - [장점](#이러한-구조의-장점)
- [api 폴더](#api-폴더)
  - [파일 네이밍 컨벤션](#파일-네이밍-컨벤션)
  - [장점](#이러한-네이밍-컨벤션으로-인해-다음-이점을-가질-수-있습니다)
- [components 폴더](#components-폴더)
  - [폴더 구성](#컴포넌트-폴더-구성)
  - [구성 원칙](#구성-원칙)
  - [장점](#폴더-구조의-장점)
- [constants 폴더](#constants-폴더)
  - [상수 정의 원칙](#상수-정의-원칙)
- [stores 폴더](#stores-폴더)
  - [스토어 구현 원칙](#스토어-구현-원칙)
- [hooks 폴더](#hooks-폴더)
  - [훅 구현 원칙](#훅-구현-원칙)
  - [네이밍 컨벤션](#네이밍-컨벤션)
  - [장점](#이러한-구조의-장점-1)
- [test 폴더](#test-폴더)

프론트엔드 프로젝트의 효율적인 관리와 협업을 위해서는 일관된 폴더 구조가 매우 중요합니다. 잘 정리된 폴더 구조는 다음과 같은 이점을 제공합니다:

- 코드의 가독성과 유지보수성 향상
- 팀원 간의 원활한 협업 가능
- 새로운 팀원의 빠른 온보딩
- 확장 가능한 프로젝트 구조 제공
- 관련 코드의 응집도 향상을 위한 코로케이션(Colocation) 원칙 적용

이 문서에서는 우리 프로젝트에서 사용하는 표준 폴더 구조와 각 폴더의 용도를 설명합니다.

```bash
./src
├── api         # API 통신 관련 코드 (/service 폴더로 대체가능)
├── components  # 재사용 가능한 UI 컴포넌트
├── constants   # 상수 정의
├── hooks       # 커스텀 훅
├── utils       # 유틸리티
├── pages       # 페이지 컴포넌트
├── stores      # 상태 관리 스토어
├── styles      # 전역 스타일 정의
└── types       # 전역 타입 정의
```

각 폴더는 필요에 따라 추가 폴더나 하위 폴더를 가질 수 있으며, 도메인이나 기능별로 구분하여 관리할 수 있습니다.

## pages 폴더

페이지는 실제 라우트 경로와 일치하는 구조로 구성되며, 각 페이지별로 독립적인 폴더를 가집니다.

- 페이지 컴포넌트의 파일명은 라우트 경로와 일치하도록 `-page.tsx` 접미사를 사용합니다.
- 해당 페이지에서만 사용되는 리소스는 언더바(\_)로 시작하는 폴더 내에 위치시켜 페이지 전용 리소스임을 명시합니다.

**예시 구조:**

```bash
./src/pages
├── home
│   ├── home-page.tsx
│   ├── _components
│   │   ├── main-banner.tsx        # 메인 배너 슬라이더
│   │   └── today-deals.tsx        # 오늘의 특가 섹션
│   ├── _hooks
│   │   └── use-banner-timer.ts    # 배너 타이머 로직
│   ├── _lib
│   │   └── banner-utils.ts        # 배너 관련 유틸 (이미지 사이즈, 애니메이션 등)
│   ├── _types
│   │   └── banner.ts              # 배너 데이터 타입
│   └── _constants
│       └── banner-options.ts      # 배너 설정값 (전환 시간, 효과 등)
├── products
│   ├── [id]
│   │   ├── product-detail-page.tsx
│   │   ├── _components
│   │   │   ├── size-selector.tsx      # 상품 사이즈 선택 UI
│   │   │   └── stock-notice.tsx       # 재고 알림 신청 모달
│   │   ├── _hooks
│   │   │   └── use-stock-alarm.ts     # 재고 알림 로직
│   │   ├── _lib
│   │   │   └── size-calculator.ts     # 사이즈 변환 계산 유틸
│   │   ├── _types
│   │   │   └── stock-alarm.ts         # 재고 알림 관련 타입
│   │   └── _constants
│   │       └── size-chart.ts          # 사이즈 차트 데이터
│   └── products-page.tsx
└── my-page
    ├── my-page.tsx
    ├── _components
    │   ├── point-history.tsx          # 포인트 내역 테이블
    │   └── grade-benefits.tsx         # 회원등급 혜택 안내
    ├── _hooks
    │   └── use-point-calculator.ts    # 포인트 계산 로직
    ├── _lib
    │   └── grade-utils.ts             # 등급 계산 유틸
    ├── _types
    │   └── point-history.ts           # 포인트 내역 타입
    └── _constants
        └── grade-rules.ts             # 등급 산정 기준
```

이러한 구조의 장점:

- 페이지별로 독립적인 기능과 로직을 응집도 있게 관리
- 특정 페이지에서만 필요한 비즈니스 로직을 명확하게 구분
- 재사용이 필요없는 페이지 전용 컴포넌트와 로직을 격리
- 페이지별 기능 확장과 유지보수가 용이

## api 폴더

API 통신 관련 코드를 Axios와 React Query 기반으로 체계적으로 관리합니다. 각 도메인별 엔드포인트는 다음과 같은 하위 구조를 가집니다:

```bash
./src/api
├── auth
│   ├── fetchers
│   │   ├── post-login.ts
│   │   └── post-register.ts
│   ├── mutations
│   │   ├── types
│   │   │   └── post-register.ts
│   │   └── use-post-register-mutation.ts
│   ├── queries
│   │   ├── types
│   │   │   └── auth-status.ts
│   │   └── use-get-auth-status-query.ts
├── users
│   ├── fetchers
│   │   ├── get-profile.ts
│   │   ├── patch-profile.ts
│   │   ├── put-profile-image.ts
│   │   └── delete-account.ts
│   ├── mutations
│   │   ├── types
│   │   │   └── patch-profile.ts
│   │   └── use-patch-profile-mutation.ts
│   ├── queries
│   │   ├── types
│   │   │   └── get-profile.ts
│   │   └── use-get-profile-query.ts
└── products
    ├── fetchers
    │   ├── get-product-list.ts
    │   ├── get-product-detail.ts
    │   ├── post-product.ts
    │   ├── put-product.ts
    │   └── delete-product.ts
    ├── mutations
    │   ├── types
    │   │   └── post-product.ts
    │   └── use-post-product-mutation.ts
    ├── queries
    │   ├── types
    │   │   └── get-product-list.ts
    │   └── use-get-product-list-query.ts
```

**파일 네이밍 컨벤션:**

- 모든 파일명은 **케밥 케이스**(kebab-case) 사용
- **fetchers**: HTTP 메서드를 접두어로 사용
  - GET: get-profile.ts
  - POST: post-product.ts
  - PUT: put-product.ts
  - PATCH: patch-profile.ts
  - DELETE: delete-product.ts
- **mutations**: 'use-{method}-{기능}-mutation' 형식
  - 예: use-put-product-mutation.ts
  - 예: use-delete-account-mutation.ts
- **queries**: 'use-{method}-{기능}-query' 형식
  - 예: use-get-product-detail-query.ts
- **types**: 용도에 따라 다음과 같은 패턴 사용
  - query, mutation에 필요한 타입은 각 폴더 내부에 작성
  - 공통 타입: {리소스}.ts
  - 요청 파라미터: {리소스}-params.ts
  - 요청 바디: {리소스}-request.ts, {기능}-request.ts
  - 응답: {리소스}-response.ts, {기능}-response.ts
  - 생성/수정: {리소스}-create-request.ts, {리소스}-update-request.ts

이러한 네이밍 컨벤션으로 인해 다음 이점을 가질 수 있습니다:

- 모든 HTTP 메서드에 대한 일관된 네이밍 패턴 제공
- RESTful API 동작과 일치하는 직관적인 파일 구조
- 리소스에 대한 CRUD 작업을 명확하게 표현
- 요청/응답 타입의 명확한 구분
- API 스펙 변경 시 타입 업데이트 용이

## components 폴더

모든 공통 컴포넌트는 단일레벨로 단순하게 관리합니다. Primitive UI 컴포넌트만 별도의 `ui` 폴더에서 관리하여 다른 컴포넌트들과 명확히 구분합니다.

- 모든 컴포넌트는 폴더로 관리합니다.
- 내부에는 항상 `index.tsx` 파일이 존재합니다.
- `index.tsx` 파일은 외부 노출용 파일입니다.
- 컴포넌트 파일은 케밥케이스(kebab-case)로 작성합니다.
- `index.tsx` 파일에서 컴포넌트 파일을 내보냅니다.

```bash
./src/components
├── ui
│   ├── button
│   │   ├── index.tsx          # 외부 노출용 파일
│   │   ├── button.tsx         # 실제 구현체
│   │   ├── button.types.ts    # 타입 정의
│   │   └── use-button-animation.ts  # 버튼 관련 훅
│   └── modal
│       ├── index.tsx
│       ├── modal.tsx
│       ├── modal.types.ts
│       ├── use-modal.ts
│       ├── use-modal-scroll-lock.ts
│       └── modal-helpers.ts
├── product-card
│   ├── index.tsx
│   ├── product-card.tsx
│   ├── product-card.types.ts
│   ├── use-product-price-format.ts
│   └── product-image-loader.ts
└── search-bar
    ├── index.tsx
    ├── search-bar.tsx
    ├── use-search-history.ts
    ├── use-search-debounce.ts
    └── search-query-parser.ts
```

### 사용 예시

```ts
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/search-bar";
```

컴포넌트 폴더 구성:

- **index.tsx**: 컴포넌트 외부 노출용 파일
- **[component-name].tsx**: 실제 컴포넌트 구현체
- **[component-name].types.ts**: 타입 정의
- **use-[feature].ts**: 컴포넌트 관련 커스텀 훅
- **[feature]-helpers.ts**: 유틸리티 함수

구성 원칙:

- **플랫한 구조**: 모든 파일을 동일 레벨에서 관리
- **명확한 네이밍**: 파일의 역할을 파일명으로 명확히 표현
- **간단한 구조**: 불필요한 폴더 계층 제거
- **쉬운 접근성**: 모든 파일에 대한 직접적인 접근 가능

폴더 구조의 장점:

- 단순하고 직관적인 파일 구조
- 파일 탐색이 용이
- 불필요한 폴더 계층 없이 깔끔한 구조
- 관련 파일들을 한눈에 파악 가능

<details>
<summary>트레이드 오프 - 배럴(barrel패턴)</summary>

배럴 파일은 여러 모듈을 한 번에 내보내는 index.js 패턴으로, import 문을 간결하게 만들어주지만 이론상 번들러의 파일 탐색 부하를 증가시킵니다.

```ts
// 배럴패턴 예시:
// /example/index.ts
export { Example1 } from "./example-1";
export { Example2 } from "./example-2";
export { exampleUtil } from "./example-util";
```

**장점:**

```ts
// 배럴 패턴 사용 - 번들링 시간 5% 증가
import {
  useProductQuery,
  useCartMutation,
  useWishlistQuery,
} from "@/api/products";

// 배럴 패턴 미사용 - 기본 번들링 시간
import { useProductQuery } from "@/api/products/queries/use-product-query";
import { useCartMutation } from "@/api/products/mutations/use-cart-mutation";
import { useWishlistQuery } from "@/api/products/queries/use-wishlist-query";
```

**단점:**

**전체 번들링 시간 예시 (100%):**

- node_modules 번들링: 95% (19초)
- 프로젝트 파일 번들링: 5% (1초)

**배럴 패턴 사용 시 프로젝트 파일 번들링:**

- 기존 번들링: 1초
- 배럴 패턴 추가 부하: +0.05초 (5% 증가)
- 최종 영향: 전체 빌드 시간의 0.25% 증가

그러나 일반적인 웹 애플리케이션에서는 프로젝트 자체 파일보다 외부 라이브러리(node_modules)가 번들링 시간의 95% 이상을 차지하기 때문에 실제 영향은 미미합니다. 다음과 같은 상황에서는 배럴 패턴 사용을 고려해볼 수 있습니다:

- 중소규모 프로젝트에서 개발 생산성 향상이 필요한 경우
- 컴포넌트 라이브러리처럼 명확한 public API가 필요한 경우
- 자주 사용되는 유틸리티 함수들을 묶어서 제공하는 경우

반면, 다음과 같은 경우에는 배럴 패턴 사용을 피하는 것이 좋습니다:

- 대규모 모노레포 프로젝트
- 번들 크기에 민감한 마이크로 프론트엔드
- 빌드 성능이 중요한 라이브러리 개발
</details>

## constants 폴더

앱 전역에서 공통으로 사용되는 상수값들을 정의합니다. 플랫한 구조로 관리하며, 각 파일은 특정 목적의 상수들을 그룹화합니다.

**예시:**

```bash
./src/constants
├── api.ts           # API 관련 상수 (엔드포인트, 상태 코드 등)
├── auth.ts          # 인증 관련 상수 (권한, 토큰 등)
├── breakpoints.ts   # 반응형 브레이크포인트
├── date.ts          # 날짜 포맷
├── regex.ts         # 정규식 패턴
└── config.ts        # 환경 설정 관련 상수
```

```ts
// api.ts
export const API_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  PROFILE: "/users/profile",
} as const;

// breakpoints.ts
export const BREAKPOINTS = {
  MOBILE: "320px",
  TABLET: "768px",
  DESKTOP: "1024px",
} as const;

// regex.ts
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
} as const;
```

**상수 정의 원칙:**

- 전역적으로 재사용되는 값만 포함
- 특정 기능에서만 사용되는 상수는 해당 기능의 폴더에서 관리
- 의미있는 이름으로 파일 구분
- 변경 가능성이 낮은 값들만 포함

## stores 폴더

전역 상태 관리를 위한 Zustand 스토어와 Context API 관련 코드를 관리합니다. 도메인별로 스토어를 분리하여 관리하며, 각 스토어는 독립적인 책임을 가집니다.

```bash
./src/stores
├── auth
│   ├── auth-store.ts          # 인증 관련 상태 관리
│   └── auth-store.types.ts    # 인증 스토어 타입 정의
├── cart
│   ├── cart-store.ts          # 장바구니 상태 관리
│   └── cart-store.types.ts    # 장바구니 스토어 타입 정의
├── ui
│   ├── modal-store.ts         # 모달 상태 관리
│   └── toast-store.ts         # 토스트 메시지 상태 관리
└── contexts
    ├── theme
    │   ├── theme-context.tsx
    │   └── theme-provider.tsx
    └── locale
        ├── locale-context.tsx
        └── locale-provider.tsx
```

## test 폴더

테스트 코드는 단위 테스트, 통합 테스트에 따라 다음과 같은 폴더 구조를 가집니다.

**단위테스트**

컴포넌트, 함수, 클래스 등 개별 단위 테스트 이므로 해당 폴더 내부에 테스트 파일을 작성합니다.

```bash
# button 컴포넌트 테스트 예시
./src/components/button
├── button.test.tsx
├── ...

# util 파일 테스트 예시
./src/utils/date-utils
├── date-utils.test.ts
├── ...
```

**통합테스트**

여러 단위 테스트를 조합하여 테스트 이므로 별도의 폴더를 가집니다. 일반적인 폴더명과 다르게 `__tests__` 폴더를 사용합니다.
그 이유는 구분성, 자동화 도구와의 호환성, 그리고 관습적 의미 때문입니다.

```bash
./src/__tests__
├── auth
│   ├── ...test.ts
├── product
│   └── ...test.ts
```
