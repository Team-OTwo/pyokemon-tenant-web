---
title: Naming Convention
---

프로젝트의 일관성 있는 코드 작성을 위해 다음과 같은 네이밍 규칙을 준수합니다:

- [네이밍 컨벤션](#네이밍-컨벤션)
- [파일명](#파일명)
- [컴포넌트/클래스](#컴포넌트클래스)
- [함수/변수](#함수변수)
- [Store](#store)
- [상수](#상수)

## 네이밍 컨벤션

| 구분            | 컨벤션           | 예시                                |
| --------------- | ---------------- | ----------------------------------- |
| 파일명          | kebab-case       | `user-profile.tsx`, `api-client.ts` |
| 컴포넌트/클래스 | PascalCase       | `UserProfile`, `ApiClient`          |
| 함수/변수       | camelCase        | `getUserData()`, `isLoading`        |
| 상수            | UPPER_SNAKE_CASE | `MAX_COUNT`, `API_BASE_URL`         |

## 파일명

> [파일 컨벤션 가이드](./03-file-convention.md)

파일명은 케밥케이스(kebab-case)로 작성되고 해당 파일의 주요 기능이나 목적을 명확하게 표현해야 합니다:

**컴포넌트 파일**

- 컴포넌트 파일은 해당 컴포넌트의 이름을 따라 명명합니다
- 예: `user-profile.tsx`, `navigation-bar.tsx`, `product-card.tsx`

**유틸리티 파일**

- 유틸리티 함수들을 모아둔 파일은 기능을 설명하는 이름을 사용합니다
- 예: `string-utils.ts`, `date-formatter.ts`, `api-helpers.ts`

**타입 정의 파일**

- 타입 정의 파일은 접미사로 `-types`또는 `.types`를 붙입니다
- 예: `user-types.ts`, `user.types.ts`, `api-response-types.ts`, `api-response.types.ts`

**테스트 파일**

- 테스트 파일은 테스트 대상 파일명 뒤에 `.test`를 붙입니다
- 예: `user-profile.test.tsx`, `string-utils.test.ts`

## 컴포넌트/클래스

컴포넌트와 클래스는 파스칼케이스를 사용하며, 명확하고 설명적인 이름을 사용해야 합니다.

- 명사 또는 명사구를 사용합니다
- 기능이나 목적을 명확하게 표현합니다
- 불필요한 축약을 피합니다
- 한 파일에는 하나의 주요 컴포넌트/클래스만 정의합니다

```tsx
// ✅ 좋은 예시
const UserProfile = () => {
  return <div>사용자 프로필</div>;
};
const ProductList = () => {
  return <div>상품 목록</div>;
};

// ❌ 나쁜 예시
const userprofile = () => {
  // 파스칼케이스를 사용하지 않음
  return <div>사용자 프로필</div>;
};
const Prdlst = () => {
  // 의미가 불분명한 축약
  return <div>상품 목록</div>;
};
```

```ts
// ✅ 좋은 예시
class ApiClient {
  constructor() {
    // ...
  }
}
class UserRepository {
  findById(id: string) {
    // ...
  }
}

// ❌ 나쁜 예시
class apiClient {
  // 파스칼케이스를 사용하지 않음
  constructor() {
    // ...
  }
}
class UsrRepo {
  // 불필요한 축약
  findById(id: string) {
    // ...
  }
}
```

## 함수/변수

함수와 변수는 카멜케이스(camelCase)를 사용하며, 그 역할을 명확하게 표현해야 합니다:

**함수 네이밍**

- 동사 또는 동사구로 시작합니다
- 함수의 목적이나 행동을 명확하게 표현합니다
- Boolean을 반환하는 함수는 `is`, `has`, `can` 등으로 시작합니다

```ts
// ✅ 좋은 예시
function getUserData() {
  /* ... */
}
function calculateTotal() {
  /* ... */
}
function isValidEmail(email: string) {
  /* ... */
}
function hasPermission(userId: string) {
  /* ... */
}

// ❌ 나쁜 예시
function data() {
  /* ... */
} // 모호한 이름
function userData() {
  /* ... */
} // 동사로 시작하지 않음
function emailValidation() {
  /* ... */
} // 동사로 시작하지 않음
```

**변수 네이밍**

- 명사 또는 명사구를 사용합니다
- 의미있고 검색 가능한 이름을 사용합니다
- 문맥상 명확한 경우가 아니면 한 글자 변수명은 피합니다

```ts
// ✅ 좋은 예시
const firstName = "John";
const userCount = 42;
const isLoading = true;
const hasError = false;

// ❌ 나쁜 예시
const x = "John"; // 의미가 불분명한 이름
const fn = "John"; // 불필요한 축약
const cnt = 42; // 불필요한 축약
```

## Store

Store는 대문자 스네이크케이스를 사용합니다.
전역 상태 라이브러리(Zustand) 사용 시 모든 Store는 접미사로 `Store`를 붙입니다.

```ts
interface UserStore {
  name: string;
  age: number;
  setName: (name: string) => void;
  setAge: (age: number) => void;
}

const userStore = createStore<UserStore>((set) => ({
  name: "",
  age: 0,
  setName: (name) => set({ name }),
  setAge: (age) => set({ age }),
}));
```

## 상수

상수는 대문자 스네이크케이스를 사용하며, 다음과 같은 규칙을 따릅니다:

- 모든 글자는 대문자를 사용합니다
- 단어 사이는 언더스코어(`_`)로 구분합니다
- 값이 변하지 않는 진짜 상수만 이 컨벤션을 적용합니다

```ts
// ✅ 좋은 예시
const MAX_ITEMS_PER_PAGE = 20;
const API_BASE_URL = "https://api.example.com";
const DEFAULT_TIMEOUT = 5000;

// ❌ 나쁜 예시
const maxItemsPerPage = 20; // 대문자를 사용하지 않음
const API_BASE_url = "https://api.example.com"; // 일관성 없는 대소문자
const Default_Timeout = 5000; // 잘못된 케이스 사용
```

**참고**: 객체 형태의 설정값의 경우, `as const` 를 사용하여 상수로 선언합니다:

```ts
export const CONFIG = {
  API_VERSION: "v1",
  MAX_RETRIES: 3,
  TIMEOUT: 5000,
} as const;

type Config = typeof CONFIG;
```
