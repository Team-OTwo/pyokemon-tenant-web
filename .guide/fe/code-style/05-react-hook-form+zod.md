---
title: react-hook-form + zod
---

React 개발에서 폼(Form) 처리는 중요한 부분을 차지합니다. 이를 효율적으로 관리하기 위해 `react-hook-form`과 `zod`를 함께 사용하는 방법을 알아보겠습니다.

- [react-hook-form](#react-hook-form)
- [zod](#zod)
  - [1. form schema 정의](#1-form-schema-정의)
  - [2. Primitive type](#2-primitive-type)
  - [3. rule 정의](#3-rule-정의)
    - [사용자 정의 Validation Rule (refine과 superRefine)](#사용자-정의-validation-rule-refine과-superrefine)
  - [4. error handling](#4-error-handling)
    - [message](#message)
    - [ZodError](#zoderror)
- [@hookform/resolvers/zod](#hookformresolverszod)
- [예시](#예시)
  - [1. zod를 사용하여 form에 사용될 schema를 정의합니다.](#1-zod를-사용하여-form에-사용될-schema를-정의합니다)
  - [2. form에서 사용될 속성 type을 정의하기 위해 schema를 이용하여 infer합니다.](#2-form에서-사용될-속성-type을-정의하기-위해-schema를-이용하여-infer합니다)
  - [3. resolver를 통해 useForm 설정합니다.](#3-resolver를-통해-useform-설정합니다)
  - [4. form 선언 및 input 선언](#4-form-선언-및-input-선언)
    - [`register` vs `<Controller>`](#register-vs-controller)
  - [5. submit 진행](#5-submit-진행)
  - [6. error 처리 (helper text, toast, modal 등)](#6-error-처리-helper-text-toast-modal-등)

## react-hook-form

> https://react-hook-form.com/

react-hook-form을 사용하는 이유는 까다로운 form과 validation 편의성을 위함입니다. 이를 위한 여러 hook과 component를 제공해줍니다.

- 폼 상태 관리와 유효성 검사를 위한 라이브러리
- 높은 성능과 사용 편의성 제공
- UI 라이브러리와의 쉬운 통합

## zod

> https://zod.dev/?id=basic-usage

zod를 사용하는 이유는 schema validation을 사용하여 form validation 편의성과 type 안정성을 위해 사용합니다.

- 스키마 기반 타입 유효성 검사 라이브러리
- TypeScript와의 뛰어난 통합성
- 강력한 타입 추론 기능

### 1. form schema 정의

zod를 사용하여 폼 스키마를 정의하는 방법을 알아보겠습니다.

```typescript
import { z } from "zod";
// 기본적인 폼 스키마 정의
const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요")
    .email("올바른 이메일 형식이 아닙니다"),
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
    .max(20, "비밀번호는 최대 20자까지 가능합니다"),
  rememberMe: z.boolean().optional(),
});
// 스키마로부터 타입 추론
type LoginFormType = z.infer<typeof loginFormSchema>;
```

위 예제에서는:

- `z.object()`를 사용하여 폼 필드들의 구조를 정의합니다
- 각 필드별로 적절한 validation 규칙을 설정합니다
- 에러 메시지를 한글로 지정하여 사용자 친화적인 피드백을 제공합니다
- `z.infer`를 사용하여 TypeScript 타입을 자동으로 생성합니다

```typescript
const signupFormSchema = z
  .object({
    username: z
      .string()
      .min(2, "사용자 이름은 2자 이상이어야 합니다")
      .max(30, "사용자 이름은 30자를 초과할 수 없습니다"),
    email: z
      .string()
      .min(1, "이메일을 입력해주세요")
      .email("올바른 이메일 형식이 아닙니다"),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
      .regex(
        /^(?=.[a-zA-Z])(?=.\d)/,
        "비밀번호는 영문과 숫자를 모두 포함해야 합니다"
      ),
    confirmPassword: z.string().min(1, "비밀번호 확인을 입력해주세요"),
    age: z
      .number()
      .min(14, "14세 이상만 가입이 가능합니다")
      .max(120, "올바른 나이를 입력해주세요"),
    terms: z.boolean().refine((val) => val === true, "이용약관에 동의해주세요"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });
```

이 예제는 다음과 같은 기능들을 보여줍니다:

- 정규식을 사용한 비밀번호 규칙 검증
- `refine()`을 사용한 커스텀 validation 규칙
- 여러 필드를 비교하는 validation (비밀번호 확인)
- number 타입의 validation
- boolean 값의 validation

### 2. Primitive type

zod는 문자열, 숫자와 같은 기본(primitive) 타입에 대한 기본적인 검증 규칙을 제공하며, 이 외에도 다양한 고급 검증 규칙과 편리한 유틸리티 함수들을 제공합니다.

- Literal
- NaN
- enum
- optional
- nullable
- object
  - .shape
  - .keyof
  - .extend
  - ...
- array
  - .element
  - .nonempty
  - .min
  - .max
  - .length
- tuple
- union
- record
- ... (추가적인 내용은 공식 가이드 페이지(https://zod.dev/)를 참고하세요)

### 3. rule 정의

Zod는 모든 데이터 타입에 대해 다양한 유효성 검사 규칙을 적용할 수 있으며, 다음과 같은 내장 규칙들을 제공합니다:

- 문자열 규칙: `min()`, `max()`, `length()`, `email()`, `url()`, `regex()` 등
- 숫자 규칙: `min()`, `max()`, `int()`, `positive()`, `negative()` 등
- 배열 규칙: `nonempty()`, `min()`, `max()`, `length()` 등
- 객체 규칙: `strict()`, `strip()`, `catchall()` 등

또한 `refine()`과 `superRefine()`을 통해 커스텀 유효성 검사 규칙을 정의할 수 있습니다.

```js
// string 타입에 대한 validation rules

// validations
z.string().max(5);
z.string().min(5);
z.string().length(5);
z.string().email();
z.string().url();
z.string().emoji();
z.string().uuid();
z.string().nanoid();
z.string().cuid();
z.string().cuid2();
z.string().ulid();
z.string().regex(regex);
z.string().includes(string);
z.string().startsWith(string);
z.string().endsWith(string);
z.string().datetime(); // ISO 8601; 기본적으로 'Z' 시간대만 허용
z.string().ip(); // IPv4와 IPv6 모두 기본적으로 허용
z.string().cidr(); // IPv4와 IPv6 모두 기본적으로 허용

// transforms
z.string().trim(); // 공백 제거
z.string().toLowerCase(); // 소문자로 변환
z.string().toUpperCase(); // 대문자로 변환

// added in Zod 3.23
z.string().date(); // ISO 날짜 형식 (YYYY-MM-DD)
z.string().time(); // ISO 시간 형식 (HH:mm:ss[.SSSSSS])
z.string().duration(); // ISO 8601 기간
z.string().base64();
```

```js
// number 타입에 대한 validation rules

z.number().gt(5);
z.number().gte(5); // min(5)와 동일
z.number().lt(5);
z.number().lte(5); // max(5)와 동일

z.number().int(); // 정수만 허용

z.number().positive(); //     0보다 큰 수
z.number().nonnegative(); //  0보다 크거나 같은 수
z.number().negative(); //     0보다 작은 수
z.number().nonpositive(); //  0보다 작거나 같은 수

z.number().multipleOf(5); // 5의 배수만 허용. step(5)와 동일

z.number().finite(); // Infinity나 -Infinity가 아닌 유한수만 허용
z.number().safe(); // Number.MIN_SAFE_INTEGER와 Number.MAX_SAFE_INTEGER 사이의 값만 허용
```

이 이외에도 다양한 validation rules이 미리 지정되어있고 편하게 사용할 수 있습니다.

#### 사용자 정의 Validation Rule (refine과 superRefine)

zod에서는 기본 validation rule 외에도 사용자 정의 유효성 검사를 위한 두 가지 메서드를 제공합니다:

1. **refine**: 간단한 사용자 정의 유효성 검사에 사용
2. **superRefine**: 더 복잡한 유효성 검사 로직이 필요할 때 사용

**refine 사용 예시**

```typescript
const userSchema = z
  .object({
    username: z.string(),
    age: z.number(),
    birthYear: z.number(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.age >= 20 && data.birthYear <= 2004, {
    message: "20세 이상만 가입이 가능합니다",
    path: ["age"], // 에러를 특정 필드에 연결
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

// 동적 에러 메시지 예시
const productSchema = z
  .object({
    price: z.number(),
  })
  .refine(
    (data) => data.price >= 1000,
    (data) => ({
      message: `최소 가격은 1000원입니다. 현재 가격: ${data.price}원`,
    })
  );
```

**superRefine 사용 예시**

```typescript
const advancedFormSchema = z
  .object({
    email: z.string(),
    password: z.string(),
    birthday: z.date(),
  })
  .superRefine((data, ctx) => {
    // 복잡한 이메일 검증
    if (!data.email.includes("@")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "올바른 이메일 형식이 아닙니다",
        path: ["email"],
      });
    }

    // 비밀번호 복잡도 검증
    const passwordStrength = calculatePasswordStrength(data.password);
    if (passwordStrength < 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호가 너무 취약합니다",
        path: ["password"],
      });
    }

    // 나이 제한 검증
    const age = calculateAge(data.birthday);
    if (age < 14) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "14세 이상만 가입이 가능합니다",
        path: ["birthday"],
      });
    }
  });
```

### 4. error handling

> https://zod.dev/ERROR_HANDLING

validation이 통과되지 않을 경우에 사용될 메시지를 rule 정의와 함께 에러를 핸들링할 수 있습니다.

#### message

문자열 스키마를 생성할 때 일반적인 에러 메시지를 다음과 같이 커스터마이징할 수 있습니다. 메서드를 사용할 때 추가 인자를 전달하여 사용자 정의 오류 메시지를 제공할 수 있습니다.

```ts
// string
const name = z.string({
  required_error: "Name is required",
  invalid_type_error: "Name must be a string",
});

// number
const age = z.number({
  required_error: "Age is required",
  invalid_type_error: "Age must be a number",
});

// date
const myDateSchema = z.date({
  required_error: "Please select a date and time",
  invalid_type_error: "That's not a date!",
});

// array - optional custom error message
const nonEmptyStrings = z.string().array().nonempty({
  message: "Can't be empty!",
});

// refine
const myString = z.string().refine((val) => val.length <= 255, {
  message: "String can't be more than 255 characters",
});
```

#### ZodError

Zod에서 발생하는 모든 유효성 검사 오류는 ZodError의 인스턴스입니다.

```ts
class ZodError extends Error {
  issues: ZodIssue[];
}

// ...

try {
  // schema validation 시도
  const validatedData = loginFormSchema.parse(data);
  return {
    success: true,
    data: validatedData,
  };
} catch (error) {
  // ZodError 타입 체크
  if (error instanceof z.ZodError) {
    return {
      success: false,
      error: error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    };
  }

  // 기타 예외 처리
  return {
    success: false,
    error: "알 수 없는 오류가 발생했습니다.",
  };
}
```

ZodError는 Error 클래스를 상속받은 것으로, 다음과 같이 쉽게 인스턴스를 생성할 수 있습니다:

```ts
import * as z from "zod";

const myError = new z.ZodError([]);
```

각 ZodError는 ZodIssue 배열을 포함하는 issues 속성을 가지고 있습니다. 각각의 issue는 유효성 검사 과정에서 발생한 문제를 상세히 기록합니다.

## @hookform/resolvers/zod

react-hook-form과 같이 사용하기 위한 resolver 라이브러리를 사용합니다.

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 1. 스키마 정의
const loginSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다"),
  password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다"),
});

// 2. 타입 추론
type LoginFormData = z.infer<typeof loginSchema>;

function LoginForm() {
  // 3. useForm 설정
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 4. 폼 제출 처리
  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 5. register를 사용한 기본 입력 방식 */}
      <input {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      {/* 6. Controller를 사용한 커스텀 입력 컴포넌트 방식 */}
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <CustomInput
            {...field}
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        )}
      />

      <button type="submit">로그인</button>
    </form>
  );
}
```

## 예시

### 1. zod를 사용하여 form에 사용될 schema를 정의합니다.

primitive한 zod의 타입을 이용해서 validation rule과 메시지 등을 정의합니다.

```tsx
import { z } from "zod";

// 스키마 정의
const signupSchema = z.object({
  username: z
    .string()
    .min(2, "사용자 이름은 2자 이상이어야 합니다")
    .max(10, "사용자 이름은 10자를 초과할 수 없습니다"),
  email: z
    .string()
    .min(1, "이메일을 입력해주세요")
    .email("올바른 이메일 형식이 아닙니다"),
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      "비밀번호는 영문과 숫자를 모두 포함해야 합니다"
    ),
  age: z
    .number()
    .min(14, "14세 이상만 가입이 가능합니다")
    .max(120, "올바른 나이를 입력해주세요"),
});
```

### 2. form에서 사용될 속성 type을 정의하기 위해 schema를 이용하여 infer합니다.

useForm 등 react-hook-form에 사용될 기능에 form 타입을 위해 infer 합니다.

```tsx
type SignupFormData = z.infer<typeof signupSchema>;
```

### 3. resolver를 통해 useForm 설정합니다.

제네릭타입으로 infer한 타입을 넣음으로 인해 타입(value 등)이 자동으로 infer 됩니다.

```tsx
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const {
  control,
  handleSubmit,
  formState: { errors },
} = useForm<SignupFormData>({
  resolver: zodResolver(signupSchema),
  defaultValues: {
    username: "",
    email: "",
    password: "",
    age: 14,
  },
});
```

### 4. form 선언 및 input 선언

form 과 form에 사용될 여러 input 등을 선언하여 구성합니다.

```tsx
const SignupForm = () => {
  // useForm 설정
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      age: 14,
    },
  });

  // 5. submit 핸들러
  const onSubmit = (data: SignupFormData) => {
    console.log("가입 데이터:", data);
    // API 호출 등 추가 로직
  };

  // form 및 input 구성
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <div>
              <label>사용자 이름</label>
              <input {...field} type="text" />
              {/* 에러 처리 */}
              {errors.username && (
                <p style={{ color: "red" }}>{errors.username.message}</p>
              )}
            </div>
          )}
        />
      </div>

      <div>{/* ... */}</div>

      <div>{/* ... */}</div>

      <div>{/* ... */}</div>

      <button type="submit">가입하기</button>
    </form>
  );
};
```

#### `register` vs `<Controller>`

**Controller**
Controller는 외부 UI 라이브러리나 React Hook Form이 기본적으로 지원하지 않는 비제어 컴포넌트를 관리할 때 사용합니다.

- 비제어 컴포넌트를 컨트롤해야 할 때. Material-UI, Ant Design 등 외부 UI 라이브러리의 `Input`, `Select`, `Checkbox` 등 컴포넌트.
- React Hook Form이 자동으로 ref를 연결할 수 없는 경우. 커스텀 로직이 필요한 경우 `onChange`, `onBlur`, `value`를 직접 제어하거나 가공해야 하는 경우.
- 폼 상태와 컴포넌트 상태를 동기화해야 하는 경우. 상태 변화 시 폼 데이터를 바로 업데이트해야 하는 상황.

**register**
기본 기능으로 충분히 처리 가능한 기본 HTML Input 요소를 사용할 때 Controller는 필요하지 않습니다.

- `<input>`, `<textarea>`, `<select>`와 같은 표준 폼 요소.
- React Hook Form이 ref를 자동으로 연결할 수 있는 경우. 예를 들어, register 메서드를 사용해 상태를 간단히 관리 가능할 때.
- 폼 상태와 UI 컴포넌트 상태가 자연스럽게 동기화되는 경우. 특별한 추가 로직이 필요 없는 간단한 폼.

### 5. submit 진행

우리가 정의한 schema에 따라 valid한 form data라면 react-hook-form에서 제공하는 handleSubmit을 통해 data를 쉽게 받아 처리할 수 있습니다.

- handleSubmit의 첫번째 파라미터는 form이 submit 시에 validation을 통과하면 호출되는 callback 함수 입니다.
- 두번째 파라미터는 반대로 통과하지 못하면 호출되는 callback 함수입니다. 주로 첫번째 파라미터인 valid success callback 함수만 정의해서 사용합니다.

```tsx
// submit 핸들러
const onSubmit = (data: SignupFormData) => {
  console.log("가입 데이터:", data);
  // API 호출 등 추가 로직
};

const onError = (data: ...) => {
  console.error("Form 에러:", )
}

<form onSubmit={handleSubmit(onSubmit, onError)}>{/* ... */}</form>;
```

### 6. error 처리 (helper text, toast, modal 등)

schema validation을 통과하지 못할 시 mode(`all`, `onChange`, `onBlur` 등이 있습니다. 문서를 참고해주세요) 시점에 맞춰 validation errors에 상태값을 확인할 수 있습니다.
formState의 `errors`를 확인하여 타겟 form data의 에러를 확인할 수 있습니다. 여기서 message는 schema 정의 시 작성한 에러 메시지 입니다.

```tsx
<Controller
  name="username"
  control={control}
  render={({ field }) => (
    <div>
      <label>사용자 이름</label>
      <input {...field} type="text" />
      {/* 에러 처리 */}
      {errors.username && (
        <p style={{ color: "red" }}>{errors.username.message}</p>
      )}
    </div>
  )}
/>
```
