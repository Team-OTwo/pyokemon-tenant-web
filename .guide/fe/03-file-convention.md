---
title: File Convention
---

프로젝트의 일관성과 유지보수성을 높이기 위한 파일 네이밍 컨벤션을 안내합니다.

- [기본 원칙](#기본-원칙)
- [components](#components)
- [hooks](#hooks)
- [utils](#utils)
- [api](#api)
- [styles](#styles)
- [types](#types)
- [class](#class)
- [constants](#constants)
- [test](#test)
- [주의사항](#주의사항)
- [reference](#reference)

## 기본 원칙

1. 모든 파일명은 **케밥케이스**(**kebab-case**)를 사용합니다.

   - 예: `user-profile.tsx`, `api-service.ts`, `main-styles.css`

2. 파일명에는 영문 소문자와 숫자, 하이픈(`-`), 점(`.`)만 사용합니다.

   - 특수문자, 공백, 대문자 사용을 금지합니다.

3. 파일명은 해당 파일의 주요 목적이나 기능을 명확하게 표현해야 합니다.
   - 예: `user-authentication.ts`, `date-formatter.ts`, 'date-utils.test.ts`

> **주의사항**
>
> - 이 가이드는 파일명에 대한 컨벤션입니다.
> - 변수명, 함수명, 클래스명 등 코드 내부의 네이밍 컨벤션은 [여기](./04-naming-convention.md)를 참고하세요.

## components

컴포넌트 파일 컨벤션은 **케밥케이스**(**kebab-case**)로 작성합니다.

다음과 같은 이유로 케밥케이스(kebab-case)를 사용합니다.

- Git은 대소문자를 구분하지만, Windows나 macOS의 파일 시스템은 기본적으로 대소문자를 구분하지 않습니다
- 이로 인해 파일명의 대소문자를 변경할 때 예기치 않은 문제가 발생할 수 있습니다
  - CI/CD 파이프라인에서 빌드 실패
  - 로컬에서는 정상 동작하지만 프로덕션 환경에서 파일을 찾지 못하는 문제
  - 팀원들 간의 머지 충돌
  - macOS에서 작업 후 Linux 서버에 배포할 때 파일을 찾지 못하는 문제
  - 대소문자만 다른 동일한 파일명이 존재할 때 예상치 못한 동작 발생
- URL 경로와의 일관성을 유지할 수 있습니다
  - 웹 URL은 대소문자를 구분하므로, 파일 시스템과 URL 간의 일관성 유지 가능
- 케밥케이스 사용의 추가적인 이점
  - 파일명에 공백이나 특수문자 사용으로 인한 문제 예방
  - 명령줄에서 파일 다루기가 더 용이함
  - IDE나 텍스트 에디터에서의 자동완성 기능이 더 정확하게 동작

```diff
# 컴포넌트 파일명 컨벤션
components/
- ├─ UserProfile.tsx     # ❌ 파스칼케이스
+ ├─ user-profile.tsx    # ✅ 케밥케이스
- ├─ loginForm.tsx       # ❌ 카멜케이스
+ ├─ login-form.tsx      # ✅ 케밥케이스
- └─ NavigationBar.tsx   # ❌ 파스칼케이스
+ └─ navigation-bar.tsx  # ✅ 케밥케이스

# 동일한 파일명이지만 대소문자가 다른 경우의 문제
components/
  ├─ UserProfile.tsx     # Git: 다른 파일로 인식
  └─ userprofile.tsx     # Windows/macOS: 같은 파일로 인식
                         # 충돌 및 예기치 않은 동작 발생
```

## hooks

커스텀 훅 파일 컨벤션은 **케밥케이스**(**kebab-case**)로 작성합니다. 그리고 접두사로 반드시 `use-`를 붙여야 합니다.

```diff
# 커스텀 훅 파일명 컨벤션
hooks/
- ├─ useUserState.ts      # ❌ 카멜케이스
+ ├─ use-user-state.ts    # ✅ 케밥케이스
- ├─ UseAuth.ts           # ❌ 파스칼케이스
+ ├─ use-auth.ts          # ✅ 케밥케이스
- └─ useFetchData.ts      # ❌ 카멜케이스
+ └─ use-fetch-data.ts    # ✅ 케밥케이스

# 동일한 파일명이지만 대소문자가 다른 경우의 문제
hooks/
  ├─ useAuth.ts           # Git: 다른 파일로 인식
  └─ useauth.ts           # Windows/macOS: 같은 파일로 인식
                          # 충돌 및 예기치 않은 동작 발생
```

## utils

유틸리티 파일에 대한 파일 컨벤션은 **케밥케이스**(**kebab-case**)로 작성합니다.

**예시:**

- 날짜/시간 관련 유틸리티 (예: `date-format.ts`, `time-utils.ts`)
- 문자열 처리 유틸리티 (예: `string-utils.ts`, `text-formatter.ts`)
- 숫자/수학 관련 유틸리티 (예: `number-format.ts`, `calculation-utils.ts`)
- 배열/객체 처리 유틸리티 (예: `array-utils.ts`, `object-utils.ts`)
- 검증/유효성 검사 유틸리티 (예: `validation-utils.ts`, `form-validator.ts`)
- 파일 처리 유틸리티 (예: `file-utils.ts`, `image-processor.ts`)
- API 관련 유틸리티 (예: `api-utils.ts`, `request-handler.ts`)
- 보안 관련 유틸리티 (예: `security-utils.ts`, `encryption-utils.ts`)
- 로깅/디버깅 유틸리티 (예: `logger.ts`, `debug-utils.ts`)
- 브라우저/DOM 관련 유틸리티 (예: `browser-utils.ts`, `dom-utils.ts`)
- 테스트 관련 유틸리티 (예: `test-utils.ts`, `mock-data-generator.ts`)

```diff
# 유틸리티 파일명 컨벤션
utils/
- ├─ dateFormat.ts        # ❌ 카멜케이스
+ ├─ date-format.ts       # ✅ 케밥케이스
- ├─ StringUtils.ts       # ❌ 파스칼케이스
+ ├─ string-utils.ts      # ✅ 케밥케이스
- └─ numberHelper.ts      # ❌ 카멜케이스
+ └─ number-helper.ts     # ✅ 케밥케이스
```

## api

API 파일에 대한 파일 컨벤션은 **케밥케이스**(**kebab-case**)로 작성합니다.

```diff
# API 파일명 컨벤션
api/
- ├─ userApi.ts           # ❌ 카멜케이스
+ ├─ user-api.ts          # ✅ 케밥케이스
- ├─ AuthApi.ts           # ❌ 파스칼케이스
+ ├─ auth-api.ts          # ✅ 케밥케이스
- └─ paymentApi.ts        # ❌ 카멜케이스
+ └─ payment-api.ts       # ✅ 케밥케이스

# 도메인별 구조화 예시
api/
  ├─ user/
  │  ├─ user-api.ts
  │  └─ user-api.test.ts
  ├─ auth/
  │  ├─ auth-api.ts
  │  └─ auth-api.test.ts
  └─ payment/
     ├─ payment-api.ts
     └─ payment-api.test.ts
```

## styles

스타일 파일에 대한 파일 컨벤션은 **케밥케이스**(**kebab-case**)로 작성합니다.

```diff
# 스타일 파일명 컨벤션
styles/
- ├─ mainStyles.css        # ❌ 카멜케이스
+ ├─ main-styles.css       # ✅ 케밥케이스
- ├─ ButtonTheme.scss      # ❌ 파스칼케이스
+ ├─ button-theme.scss     # ✅ 케밥케이스
- └─ layoutVariables.scss  # ❌ 카멜케이스
+ └─ layout-variables.scss # ✅ 케밥케이스

# 컴포넌트별 스타일 예시
styles/
  ├─ globals.css
  └─ markdown.css
```

## types

타입 정의 파일에 대한 파일 컨벤션은 **케밥케이스**(**kebab-case**)로 작성합니다.

```diff
# 타입 파일명 컨벤션
types/
- ├─ userTypes.ts          # ❌ 카멜케이스
+ ├─ user-types.ts         # ✅ 케밥케이스
+ ├─ user.types.ts         # ✅ 케밥케이스 + 접미사(.types)
- ├─ ApiResponse.ts        # ❌ 파스칼케이스
+ ├─ api-response.ts       # ✅ 케밥케이스
- └─ GlobalState.ts        # ❌ 파스칼케이스
+ └─ global-state.ts       # ✅ 케밥케이스

# 도메인별 타입 구조화 예시
types/
  ├─ user/
  │  ├─ user-profile.ts
  │  └─ user-settings.ts
  ├─ auth/
  │  ├─ auth-types.ts
  │  └─ token-types.ts
  └─ common/
     ├─ api-types.ts
     └─ utility-types.ts
```

## class

클래스 파일에 대한 파일 컨벤션은 **케밥케이스**(**kebab-case**)로 작성합니다.

```diff
# 클래스 파일명 컨벤션
classes/
- ├─ UserModel.ts          # ❌ 파스칼케이스
+ ├─ user-model.ts         # ✅ 케밥케이스
- ├─ DataValidator.ts      # ❌ 파스칼케이스
+ ├─ data-validator.ts     # ✅ 케밥케이스
- └─ eventEmitter.ts       # ❌ 카멜케이스
+ └─ event-emitter.ts      # ✅ 케밥케이스

# 도메인별 클래스 구조화 예시
classes/
  ├─ models/
  │  ├─ user-model.ts
  │  └─ product-model.ts
  ├─ validators/
  │  ├─ form-validator.ts
  │  └─ data-validator.ts
  └─ core/
     ├─ event-emitter.ts
     └─ state-manager.ts
```

## constants

상수 파일에 대한 파일 컨벤션은 **케밥케이스**(**kebab-case**)로 작성합니다.

```diff
# 상수 파일명 컨벤션
constants/
- ├─ ApiEndpoints.ts       # ❌ 파스칼케이스
+ ├─ api-endpoints.ts      # ✅ 케밥케이스
- ├─ configValues.ts       # ❌ 카멜케이스
+ ├─ config-values.ts      # ✅ 케밥케이스
- └─ AppConstants.ts       # ❌ 파스칼케이스
+ └─ app-constants.ts      # ✅ 케밥케이스
```

## test

테스트 파일에 대한 파일 컨벤션은 **케밥케이스**(**kebab-case**)로 작성합니다.

```diff
# 테스트 파일명 컨벤션
test/
- ├─ userTest.ts           # ❌ 카멜케이스
+ ├─ user-test.ts          # ✅ 케밥케이스
- ├─ AuthTest.ts           # ❌ 파스칼케이스
+ ├─ auth-test.ts          # ✅ 케밥케이스
- └─ PaymentTest.ts        # ❌ 카멜케이스
+ └─ payment-test.ts       # ✅ 케밥케이스
```

또한 단위 테스트와 통합 테스트에 따라 다음과 같은 파일명 구조를 가집니다.

**단위 테스트**

컴포넌트, 함수, 클래스 등 개별 단위 테스트 이므로 해당 폴더 내부에 테스트 파일을 작성합니다.

```bash
./src/components/button
├── button.test.tsx
├── ...

# util 파일 테스트 예시
./src/utils/date-utils
├── date-utils.test.ts
├── ...
```

**통합 테스트**

여러 단위 테스트를 조합하여 테스트 이므로 별도의 폴더를 가집니다.
몇 가지 규칙에 따라 파일명을 작성합니다.

- 기능 중심: 사용자 시나리오를 기반으로 테스트 파일명 작성
- 페이지/컴포넌트 중심: 대상 컴포넌트(페이지) 이름과 함께 접미사로 `integration` 파일명으로 사용
- 테스트 의도를 명확하게 표현하는 파일명 사용

```bash
# 기능 중심
./src/__tests__
├── auth
│   ├── login.test.ts
│   └── join.test.ts
├── product
│   ├── retrieve-product-list.test.ts
│   └── product-search.test.ts
├── cart
│   └── add-to-cart.test.ts

# 페이지/컴포넌트 중심
./src/__tests__
├── product-page
│   └── product-page.integration.test.ts
├── dashboard
│   └── dashboard-page.integration.test.ts
```

## 주의사항

파일명의 대소문자를 변경할 때는 다음과 같은 방법을 사용해야 합니다:

```bash
# 잘못된 방법 (Windows/macOS에서 문제 발생)
git mv MyFile.js myfile.js

# 올바른 방법
git mv MyFile.js MyFile.js.temp
git mv MyFile.js.temp myfile.js
```

## reference

- https://x.com/kentcdodds/status/1249870276688371713
- https://www.hanselman.com/blog/git-is-casesensitive-and-your-filesystem-may-not-be-weird-folder-merging-on-windows
