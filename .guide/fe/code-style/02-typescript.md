---
title: TypeScript
---

TypeScript 코드 스타일 가이드를 안내합니다.

## Opinionated

### 타입과 인터페이스 이름 규칙

타입과 인터페이스 이름에 불필요한 접두사를 사용하지 않습니다.

IDE의 자동완성과 타입 힌트로 충분히 타입 정보 확인 가능하고, 실제 의미있는 이름에 집중합니다.
또한, TypeScript 공식 코드베이스도 접두사를 사용하지 않습니다.

```ts
// ❌ 불필요한 접두사 사용
interface IUser {
  name: string;
  age: number;
}

type TConfig = {
  theme: string;
  language: string;
};

// ✅ 명확한 이름 사용
interface User {
  name: string;
  age: number;
}

type Config = {
  theme: string;
  language: string;
};
```

### type vs interface -> interface

> If you would like a heuristic, use interface until you need to use features from type.
> [typescript docs](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)

기본적으로 interface를 사용하고, type은 필요할 경우 사용합니다.

### any 타입 사용 제한

`any` 타입은 TypeScript의 타입 체크를 무력화하므로 사용을 지양합니다:

```ts
// ❌ any 사용
function processData(data: any) {
  return data.someProperty; // 타입 안정성 상실
}

// ✅ 구체적인 타입 또는 unknown 사용
function processData<T>(data: T) {
  if (typeof data === "object" && data !== null) {
    // 타입 가드를 통한 안전한 접근
  }
}
```

### 타입 단언보다 타입 가드 사용

타입 단언(`as`) 대신 타입 가드를 사용하여 더 안전한 타입 체크를 구현합니다:

```ts
// ❌ 타입 단언 사용
const userInput = input as string;

// ✅ 타입 가드 사용
if (typeof input === "string") {
  const userInput = input; // string 타입으로 자동 추론
}
```

### 타입 가드 함수 활용

커스텀 타입 가드 함수를 활용하여 타입 안전성을 높입니다:

```ts
// ❌ 타입 단언 사용
const processResponse = (response: unknown) => {
  const data = response as ApiResponse;
  // ...
};

// ✅ 타입 가드 함수 사용
function isApiResponse(value: unknown): value is ApiResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "data" in value &&
    "status" in value
  );
}

const processResponse = (response: unknown) => {
  if (isApiResponse(response)) {
    // response는 ApiResponse 타입으로 좁혀짐
    console.log(response.data);
  }
};
```

### 명시적인 타입 선언 vs 타입 추론 -> 타입 추론 권장

TypeScript의 강력한 타입 추론 기능을 활용하는 것을 권장합니다:

```ts
// ❌ 불필요한 타입 선언
const name: string = "홍길동";
const numbers: number[] = [1, 2, 3];

// ✅ 타입 추론 활용
const name = "홍길동";
const numbers = [1, 2, 3];
```

### 유니온 타입 vs 제네릭 -> 상황에 따라 구분

데이터의 다형성을 표현할 때는 상황에 따라 적절한 방식을 선택합니다:

```ts
// 유니온 타입이 적절한 경우 (제한된 타입 집합)
type Status = "loading" | "success" | "error";

// 제네릭이 적절한 경우 (재사용 가능한 타입 패턴)
interface ApiResponse<T> {
  data: T;
  status: Status;
}
```

### enum vs const assertion -> const assertion

TypeScript의 enum은 다음과 같은 사항으로 인해 const assertion (`as const`)을 사용하는 것을 권장합니다:

```ts
// ❌ Enum 사용
enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  GUEST = "GUEST",
}

// ✅ const assertion 사용
export const UserRole = {
  ADMIN: "ADMIN",
  USER: "USER",
  GUEST: "GUEST",
} as const;
```

**1. 번들 사이즈 문제**

- Enum은 런타임에 실제 JavaScript 객체로 변환되어 번들에 포함됩니다
- const assertion은 컴파일 시점에 제거되어 번들 사이즈에 영향을 주지 않습니다

```js
// Enum 컴파일 결과 - 런타임에 남아있는 코드
var UserRole;
(function (UserRole) {
  UserRole["ADMIN"] = "ADMIN";
  UserRole["USER"] = "USER";
  UserRole["GUEST"] = "GUEST";
})(UserRole || (UserRole = {}));

// const assertion 컴파일 결과 - 단순 객체로 변환
const UserRole = {
  ADMIN: "ADMIN",
  USER: "USER",
  GUEST: "GUEST",
};
```

**2. Tree-shaking 최적화**

- Enum은 전체가 하나의 블록으로 처리되어 부분적인 tree-shaking이 불가능
- const assertion은 일반 객체이므로 사용하는 값만 번들에 포함됨

```ts
// Enum 사용 시 - 전체가 번들에 포함
import { UserRole } from "./constants";

console.log(UserRole.ADMIN); // 다른 Role 값들도 번들에 포함됨

// const assertion 사용 시 - ADMIN만 번들에 포함
import { UserRole } from "./constants";

console.log(UserRole.ADMIN); // tree-shaking으로 다른 값들은 제거
```

**3. 타입 안정성**

- Enum은 숫자 enum의 경우 역방향 매핑을 지원하여 예기치 않은 동작 발생 가능
- const assertion은 객체의 값을 readonly literal type으로 추론하여 더 엄격한 타입 체크

```ts
// Enum의 예기치 않은 동작
enum NumericEnum {
  A = 1,
  B = 2,
}

const val = 1;

console.log(NumericEnum[val]); // "A" - 역방향 매핑

// const assertion의 엄격한 타입 체크
const NumericValues = {
  A: 1,
  B: 2,
} as const;

type Values = (typeof NumericValues)[keyof typeof NumericValues]; // 1 | 2
```

**4. JavaScript 생태계 호환성**

- Enum은 TypeScript 전용 기능으로, JavaScript 라이브러리나 도구와의 호환성 문제 발생 가능
- const assertion은 일반 JavaScript 객체를 사용하므로 호환성 문제 없음

```ts
// JavaScript 라이브러리와 함께 사용 시
// ❌ Enum
enum Status {
  ACTIVE,
  INACTIVE,
}

someJsLibrary(Status.ACTIVE); // JavaScript에서 이해할 수 없는 구조

// ✅ const assertion
const Status = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
} as const;

someJsLibrary(Status.ACTIVE); // 일반 문자열로 전달됨
```

## Tips

### 유용한 React Prop 타입

```ts
export declare interface AppProps {
  children?: React.ReactNode; // 가장 권장됨, React가 렌더링할 수 있는 모든 것을 허용
  childrenElement: React.JSX.Element; // 단일 React 엘리먼트
  style?: React.CSSProperties; // style 속성을 전달하기 위함
  onChange?: React.FormEventHandler<HTMLInputElement>; // 폼 이벤트! 제네릭 파라미터는 event.target의 타입
  //  참고: https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#wrappingmirroring
  props: Props & React.ComponentPropsWithoutRef<"button">; // button 엘리먼트의 모든 props를 가져오되 ref는 전달하지 않음
  props2: Props & React.ComponentPropsWithRef<MyButtonWithForwardRef>; // MyButtonForwardedRef의 모든 props를 가져오고 ref도 전달함
}
```

> TODO: tips 추가
