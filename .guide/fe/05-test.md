---
title: Test
---

테스트 전략 및 수행에 대한 가이드를 제공합니다.

- [테스트 전략](#테스트-전략)
- [단위 테스트 vs. 통합 테스트 vs. 엔드투엔드 테스트](#단위-테스트-vs-통합-테스트-vs-엔드투엔드-테스트)
- [Vitest](#vitest)
- [React Testing Library](#react-testing-library)
- [Mock Service Worker](#mock-service-worker)
- [테스트 코드](#테스트-코드)
  - [단위 테스트](#단위-테스트)
  - [통합 테스트](#통합-테스트)
- [Vitest 주의사항](#vitest-주의사항)
  - [`beforeEach` 등의 hook을 과도한 사용을 피합니다.](#beforeeach-등의-hook을-과도한-사용을-피합니다)
  - [테스트 간 상태 공유(암묵적 결합)을 피합니다.](#테스트-간-상태-공유암묵적-결합을-피합니다)
  - [과도한 추상화를 피합니다.](#과도한-추상화를-피합니다)
  - [전역 상태 수정을 피합니다.](#전역-상태-수정을-피합니다)
  - [테스트 간 실행 순서를 가정하지 않습니다.](#테스트-간-실행-순서를-가정하지-않습니다)
  - [`describe` 블록에서 변수 공유는 피합니다.](#describe-블록에서-변수-공유는-피합니다)
  - [너무 많은 논리를 가진 헬퍼 함수를 피합니다.](#너무-많은-논리를-가진-헬퍼-함수를-피합니다)
  - [테스트 환경에서 테스트 결과가 지속되지 않도록 합니다.](#테스트-환경에서-테스트-결과가-지속되지-않도록-합니다)
- [React Testing Library 주의사항](#react-testing-library-주의사항)
  - [모든 테스트에 `beforeEach`로 컴포넌트 렌더링하는 것을 피합니다.](#모든-테스트에-beforeeach로-컴포넌트-렌더링하는-것을-피합니다)
  - [테스트 ID(`data-testid`)를 과도하게 사용하지 않습니다.](#테스트-iddata-testid를-과도하게-사용하지-않습니다)
  - [컴포넌트 내부 상태를 직접 조작하지 않습니다.](#컴포넌트-내부-상태를-직접-조작하지-않습니다)
  - [불필요한 `act()` 사용을 피합니다.](#불필요한-act-사용을-피합니다)
  - [쿼리 함수 선택 실수에 주의합니다.](#쿼리-함수-선택-실수에-주의합니다)
  - [불필요한 `cleanup()` 호출을 피합니다.](#불필요한-cleanup-호출을-피합니다)
  - [통합 테스트 시에는 전체 페이지 렌더링을 고려해야 합니다.](#통합-테스트-시에는-전체-페이지-렌더링을-고려해야-합니다)
- [MSW 주의사항](#msw-주의사항)
  - [서버 생명주기 관리 누락](#서버-생명주기-관리-누락)
  - [핸들러 간 우선순위 오류](#핸들러-간-우선순위-오류)
  - [동일 엔드포인트 재정의 시 메모리 누수](#동일-엔드포인트-재정의-시-메모리-누수)
  - [응답 형식 일치여부 반드시 확인](#응답-형식-일치여부-반드시-확인)
  - [상태 코드 누락](#상태-코드-누락)
  - [동적 경로 처리 오류](#동적-경로-처리-오류)
  - [네트워크 에러 시뮬레이션](#네트워크-에러-시뮬레이션)
  - [Context 유틸리티 잘 못 사용](#context-유틸리티-잘-못-사용)
  - [핸들러 내부 상태 공유는 테스트 간 간섭 유발](#핸들러-내부-상태-공유는-테스트-간-간섭-유발)

## 테스트 전략

단위 테스트를 가장 많이 작성하고, 그 다음 통합 테스트를 작성하며, 엔드투엔드 테스트는 가장 적게 작성하도록 권장합니다.

## 단위 테스트 vs. 통합 테스트 vs. 엔드투엔드 테스트

이 세 가지 테스트 중에서 어느 것을 더 강조해야 하는지에 대한 정답은 없습니다. 프로젝트의 규모, 복잡성, 팀의 전문성, 가용한 자원과 같은 다양한 요인에 따라 테스트 전략이 달라질 수 있습니다.

Mike Cohn이 그의 책 [Succeeding with Agile](https://www.amazon.com/Succeeding-Agile-Software-Development-Using/dp/0321579364)에서 처음 소개한 *테스팅 피라미드(The Testing Pyramid)*는 Google의 유명한 글인 [Just Say No to More End-to-End Tests](https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html)에서도 다뤄졌습니다. 이 접근 방식은 단위 테스트를 가장 많이 작성하고, 그다음으로 통합 테스트를 작성하며, 엔드투엔드 테스트는 가장 적게 작성하도록 권장합니다.

**통합 테스트를 우선시함으로써**, 테스트에 대한 신뢰성과 개발 효율성 간의 균형을 맞출 수 있습니다. 통합 테스트는 엔드투엔드 테스트에 수반되는 오버헤드 없이, 실세계 시나리오에서 컴포넌트들이 서로 어떻게 상호작용하는지에 대한 더 포괄적인 이해를 제공합니다.

위에서 언급된 다양한 전략에서 얻을 수 있는 주요 결론 중 하나는 엔드투엔드 테스트를 최소한으로 작성하는 것입니다. 엔드투엔드 테스트는 작성과 유지 관리에 더 많은 시간이 소요되며, 단위 테스트나 통합 테스트에 비해 실행 시간이 더 긴 경우가 많습니다. 따라서 엔드투엔드 테스트는 주로 사용자 인증, 결제 처리, 기타 핵심 애플리케이션 흐름과 같은 중요한 경로에만 작성하는 것이 권장됩니다.

당신과 팀이 단위 테스트에 더 집중할지, 아니면 통합 테스트에 더 집중할지는 궁극적으로 프로젝트의 특정 요구사항과 맥락, 그리고 테스트의 깊이와 범위에 대한 팀의 선호도에 따라 달라집니다.

## Vitest

단위, 통합 테스트 도구로 [Vitest](https://vitest.dev/)를 사용합니다.

**Vitest**

- Vitest는 Jest보다 훨씬 빠른 테스트 프레임워크입니다.
  - 참고: Vitest 코드 구문은 Jest와 동일합니다.
- Vite와 통합이 잘되어 있습니다.
- 빠른 테스트 속도는 개발 피드백 주기를 단축하고, 빠른 테스트 실행 시간은 개발자의 생산성을 향상시킵니다.

## React Testing Library

React 테스트 라이브러리로 [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)를 사용합니다.
React 컴포넌트를 테스트하기 위해 특별히 설계된 가벼운 라이브러리입니다. 이 라이브러리는 구현 세부사항보다는 사용자 경험에 초점을 맞춘 테스트 작성을 장려합니다.

- 사용자 관점 테스트: DOM과 상호작용을 통해 실제 사용자 경험에 가까운 테스트 작성이 가능.
- React에 종속적이지 않음: 컴포넌트 내부 구현보다는 동작에 집중.
- 간단한 API: 직관적이고 사용하기 쉬운 API 제공.
- 접근성 검증: `getByRole` 등 접근성에 중점을 둔 쿼리 지원.
- 유지보수성 높은 테스트: 리팩토링 후에도 깨지지 않는 테스트 작성 가능.
- 커뮤니티 및 문서화: 풍부한 자료와 활성화된 커뮤니티 지원.
- 유연성: 다양한 테스트 환경 및 유틸리티와의 통합 용이.

## Mock Service Worker

통합 테스트 시에 [Mock Service Worker(MSW)](https://mswjs.io/) 활용하여 네트워크 요청을 가로채고 모의 응답을 반환하여 테스트 환경을 제어합니다.

MSW의 주요 특징:

**환경 독립적(Agnostic)**

- 모든 브라우저와 Node.js 환경에서 사용 가능
- 추가 설정이나 플러그인 불필요
- fetch, Axios, React Query, Apollo 등 모든 요청 클라이언트와 호환

**원활한 통합(Seamless)**

- Service Worker API를 사용하여 네트워크 레벨에서 실제 요청 가로채기
- Node.js에서는 클래스 확장을 통해 프로덕션 환경과 유사한 테스트 환경 제공

**재사용성(Reusable)**

- API 모킹을 독립적인 레이어로 처리
- 개발, 통합 테스트, E2E 테스트, Storybook 등 다양한 환경에서 재사용 가능
- 네트워크 동작을 필요에 따라 커스터마이징 가능

## 테스트 코드

Vitest에서 제공하는 함수인 `test`, `describe` 등을 사용하여 테스트 코드를 작성합니다.

> 참고 링크: [Vitest 공식 문서](https://vitest.dev/api/)

- `test` 함수는 테스트 케이스를 정의하는 데 사용됩니다.
- `describe` 함수는 테스트 그룹을 정의하는 데 사용됩니다.
- `it` 함수는 `test` 함수의 별칭입니다.
- `beforeEach`, `afterEach`, `beforeAll`, `afterAll` 등의 함수는 테스트 실행 전후에 실행되는 코드를 정의하는 데 사용됩니다.
- `expect` 함수는 테스트 결과를 검증하는 데 사용됩니다.

React Testing Library에서 제공하는 함수인 `render`, `screen`, `waitFor` 등을 사용하여 테스트 코드를 작성합니다.

> 참고 링크: [React Testing Library 공식 문서](https://testing-library.com/docs/react-testing-library/api/)

- `render` 함수는 컴포넌트를 렌더링하는 데 사용됩니다.
- `screen` 객체는 렌더링된 컴포넌트의 DOM 요소를 쿼리하는 데 사용됩니다.
- `waitFor` 함수는 비동기 작업이 완료될 때까지 기다리는 데 사용됩니다.
- `userEvent` 함수는 사용자 이벤트를 시뮬레이션하는 데 사용됩니다.
- `fireEvent` 함수는 이벤트를 발생시키는 데 사용됩니다.

MSW에서 제공하는 함수인 `http`, `HttpResponse`, `setupServer` 등을 사용하여 테스트 코드를 작성합니다.

> 참고 링크: [Mock Service Worker 공식 문서](https://mswjs.io/docs/)

- `setupWorker` 함수는 MSW 서버를 설정하는 데 사용됩니다.
- `setupServer` 함수는 MSW 서버를 설정하는 데 사용됩니다.
- `http` 함수는 네트워크 요청을 가로채는 데 사용됩니다.
- `HttpResponse` 함수는 모의 응답을 반환하는 데 사용됩니다.
- `delay` 함수는 응답을 지연시키는 데 사용됩니다.

### 단위 테스트

컴포넌트, 유틸리티, 클래스 등 개별 단위 테스트 이므로 해당 폴더 내부에 테스트 파일을 작성합니다.

**예시: 버튼 클릭 시 스타일 변경 테스트**

```tsx
// ./src/components/button/button.test.tsx
test("버튼 클릭 시 스타일 변경 테스트", () => {
  render(<App />);

  // /blue/i와 일치하는 텍스트를 가진 버튼 요소 찾기
  const buttonElement = screen.getByRole("button", {
    name: /blue/i,
  });

  // 클래스가 red인지 확인
  expect(buttonElement).toHaveClass("red");

  // 버튼 클릭
  fireEvent.click(buttonElement);

  // 클래스가 blue로 변경되었는지 확인
  expect(buttonElement).toHaveClass("blue");

  // 버튼 텍스트가 /red/i와 일치하는지 확인
  expect(buttonElement).toHaveTextContent(/red/i);
});
```

**예시: 날짜 포맷팅 테스트**

```tsx
// ./src/utils/date-utils/date-utils.test.ts
import { formatDate } from "./date-utils";

test("date-utils", () => {
  test("날짜 포맷팅 테스트", () => {
    const date = new Date("2024-03-20");

    expect(formatDate(date, "YYYY-MM-DD")).toBe("2024-03-20");
    expect(formatDate(date, "YYYY년 MM월 DD일")).toBe("2024년 03월 20일");
    expect(formatDate(date, "MM/DD/YYYY")).toBe("03/20/2024");
  });
});
```

### 통합 테스트

통합 테스트는 여러 컴포넌트와 서비스가 함께 작동하는 방식을 테스트합니다.

**예시: 제품 목록 조회 & 장바구니 추가 플로우**

```tsx
// ./src/__tests__/product/product-add-to-cart.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { CartProvider } from "../contexts/CartContext";
import ProductList from "../components/ProductList";

interface Product {
  id: number;
  name: string;
  price: number;
}

const server = setupServer(
  http.get<Product[]>("/api/products", () => {
    return HttpResponse.json<Product[]>([
      { id: 1, name: "맥북 프로", price: 2_000_000 },
      { id: 2, name: "아이폰 15", price: 1_500_000 },
    ]);
  }),
  http.post<{ productId: number }>("/api/cart", async ({ request }) => {
    const item = await request.json();
    return HttpResponse.json({ ...item, id: Math.random() });
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  localStorage.clear();
});
afterAll(() => server.close());

test("제품 목록 표시 후 장바구니 추가 시 카운트 증가", async () => {
  const user = userEvent.setup();
  render(
    <CartProvider>
      <ProductList />
    </CartProvider>
  );

  const listItems = await screen.findAllByRole("listitem");
  expect(listItems).toHaveLength(2);

  const addButtons = screen.getAllByRole("button", { name: /장바구니 추가/i });
  await user.click(addButtons[0]);

  await waitFor(() => {
    expect(screen.getByTestId("cart-count")).toHaveTextContent("1");
  });
});
```

**예시: 로그인 실패 처리**

```tsx
// ./src/__tests__/auth/login-failed.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import LoginForm from "../components/LoginForm";

interface LoginError {
  error: string;
}

const server = setupServer(
  http.post<never, { email: string; password: string }>("/api/login", () => {
    return HttpResponse.json<LoginError>(
      { error: "잘못된 비밀번호" },
      { status: 401 }
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("잘못된 로그인 시 에러 메시지 표시", async () => {
  const user = userEvent.setup();
  render(<LoginForm />);

  await user.type(screen.getByLabelText(/이메일/i), "test@test.com");
  await user.type(screen.getByLabelText(/비밀번호/i), "wrongpass");
  await user.click(screen.getByRole("button", { name: /로그인/i }));

  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent("잘못된 비밀번호입니다");
});
```

```tsx
// ./src/__tests__/product/product-search-filtering.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import ProductSearch from "../components/ProductSearch";

interface Product {
  id: number;
  name: string;
}

const server = setupServer(
  http.get<Product[]>("/api/products", ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get("q") ?? "";

    const mockData: Product[] = searchTerm.includes("맥북")
      ? [{ id: 1, name: "맥북 프로" }]
      : [];

    return HttpResponse.json<Product[]>(mockData);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("검색어 입력 시 필터링된 결과 표시", async () => {
  const user = userEvent.setup();
  render(<ProductSearch />);

  const searchInput = screen.getByPlaceholderText("제품 검색");
  await user.type(searchInput, "맥북");

  await waitFor(() => {
    expect(screen.getByText("맥북 프로")).toBeInTheDocument();
  });

  await user.clear(searchInput);
  await user.type(searchInput, "없는제품");

  await waitFor(() => {
    expect(screen.getByText("검색 결과 없음")).toBeInTheDocument();
  });
});
```

## Vitest 주의사항

- **테스트는 문서다**: 다른 개발자가 봐도 한 번에 이해 가능해야 함
- **테스트는 독립적이어야 한다**: 서로의 결과에 절대 영향받지 않아야 함
- **중복 > 추상화**: 과도한 DRY 원칙이 테스트의 명확성을 해치지 않도록

Vitest 환경은 충분히 빠르기 때문에 작은 중복을 허용하면서도 테스트 코드의 신뢰성을 높이는 방향이 최적입니다.

### `beforeEach` 등의 hook을 과도한 사용을 피합니다.

필요한 테스트에서만 직접 초기화해서 사용합니다.

```tsx
// ❌ 나쁜 예: 모든 테스트에 불필요한 DB 초기화
beforeEach(() => {
  initializeDatabase(); // 10개 테스트 중 2개만 필요함
  mockAPICalls();
  setFeatureFlags();
});

test("유저 생성", () => {
  /* ... */
});
test("상품 검색", () => {
  /* ... */
});

// ✅ 좋은 예: 필요한 테스트에서만 직접 초기화
test("유저 생성", async () => {
  const db = initializeDatabase(); // 해당 테스트에서만 생성
});
```

### 테스트 간 상태 공유(암묵적 결합)을 피합니다.

각 테스트가 독립된 데이터를 사용합니다.

```tsx
// ❌ 나쁜 예: 테스트 B가 테스트 A의 결과에 의존
let cartItems = [];

test("A: 장바구니 추가", () => {
  cartItems.push("item1");
});

test("B: 장바구니 확인", () => {
  expect(cartItems).toContain("item1"); // A가 먼저 실행되어야 통과
});

// ✅ 좋은 예: 각 테스트가 독립적인 데이터 사용
test("B: 장바구니 확인", () => {
  const cartItems = ["item1"]; // 명시적 초기화
  expect(cartItems).toContain("item1");
});
```

### 과도한 추상화를 피합니다.

필요한 속성을 테스트 내에서 명시하여 테스트 코드의 명확성을 해치지 않도록 합니다.

```tsx
// ❌ 나쁜 예: setupUser() 내부 구현이 테스트 코드에서 보이지 않음
test("프로필 업데이트", () => {
  const user = setupUser(); // 어떤 속성이 초기화됐는지? 🤔
  updateProfile(user);
});

// ✅ 좋은 예: 테스트 내에서 명시적 초기화
test("프로필 업데이트", () => {
  const user = { id: 1, name: "Alice" }; // 직접 생성
  updateProfile(user, { name: "Bob" });
});
```

### 전역 상태 수정을 피합니다.

테스트별 독립적인 모킹을 통해 테스트 격리를 유지합니다.

```tsx
// ❌ 나쁜 예: 다른 테스트에 영향을 미치는 전역 변수 조작
test("환경 설정 테스트", () => {
  process.env.API_ENDPOINT = "https://fake-api.test";
});

test("API 호출 테스트", () => {
  // process.env.API_ENDPOINT가 변경된 상태로 실행됨
});

// ✅ 좋은 예: 테스트별 독립적인 모킹
test("API 호출 테스트", () => {
  vi.stubEnv("API_ENDPOINT", "https://fake-api.test"); // Vitest 권장 방식
});
```

### 테스트 간 실행 순서를 가정하지 않습니다.

각 테스트를 독립적인 시나리오로 작성합니다.

```tsx
// ❌ 나쁜 예: 테스트 실행 순서에 의존
describe("주문 프로세스", () => {
  test("1. 주문 생성", () => {
    /* ... */
  }); // 이름에 순서 강제
  test("2. 결제 처리", () => {
    /* ... */
  });
});

// ✅ 좋은 예: 테스트 실행 순서에 의존하지 않음
test("주문 생성 → 결제 처리 종단 간 테스트", () => {
  // 하나의 테스트에서 전체 흐름 검증
});
```

### `describe` 블록에서 변수 공유는 피합니다.

각 테스트 내에서 새 인스턴스 생성하여 사용합니다.

```tsx
// ❌ 나쁜 예: 다른 테스트에 영향을 미치는 변수 공유
describe("결제 모듈", () => {
  const paymentGateway = setupGateway(); // 모든 테스트에서 공유

  test("신용카드 결제", () => {
    /* paymentGateway 사용 */
  });
  test("계좌이체 결제", () => {
    /* paymentGateway 재사용 */
  });
});

// ✅ 좋은 예: 각 테스트에서 새 인스턴스 생성
describe("결제 모듈", () => {
  test("신용카드 결제", () => {
    const paymentGateway = setupGateway(); // 각 테스트에서 새 인스턴스 생성
    /* paymentGateway 사용 */
  });
  test("계좌이체 결제", () => {
    const paymentGateway = setupGateway(); // 각 테스트에서 새 인스턴스 생성
    /* paymentGateway 사용 */
  });
});
```

### 너무 많은 논리를 가진 헬퍼 함수를 피합니다.

단순 팩토리 함수를 만들어 사용하거나 필요한 경우 직접 속성 지정하여 사용합니다.

```tsx
// ❌ 조건문이 포함된 복잡한 헬퍼
function setupUser(isAdmin = false, hasSubscription = true) {
  // 50줄의 복잡한 로직...
}

// ✅ 좋은 예: 단순한 헬퍼 함수
function setupAdminUser() {
  // 단순한 로직...
}
```

### 테스트 환경에서 테스트 결과가 지속되지 않도록 합니다.

테스트 종료시에 자원을 정리합니다.(`afterEach`, `afterAll`로 정리)

```tsx
// ❌ 나쁜 예: 테스트 결과가 지속됨
test("파일 업로드", () => {
  uploadFile("test.txt"); // 실제 파일 시스템에 파일 생성
});
test("파일 삭제", () => {
  deleteFile("test.txt"); // 이전 테스트의 파일에 의존
});

// ✅ 좋은 예: 테스트 종료시 자원 정리
afterEach(() => {
  cleanup(); // 테스트 종료시 자원 정리
});
```

## React Testing Library 주의사항

### 모든 테스트에 `beforeEach`로 컴포넌트 렌더링하는 것을 피합니다.

테스트 간 컴포넌트 상태가 공유될 수도 있고 특정 테스트에서 다른 `id`가 필요하면 대응이 불가합니다.

```tsx
// ❌ 나쁜 예: 모든 테스트가 동일한 props를 가진 컴포넌트에 의존
let component;
beforeEach(() => {
  component = render(<ProductPage productId={1} />);
});

test("제목 표시", () => {
  expect(component.getByText("상품 1")).toBeInTheDocument();
});

test("가격 표시", () => {
  expect(component.getByText("$100")).toBeInTheDocument();
});
```

### 테스트 ID(`data-testid`)를 과도하게 사용하지 않습니다.

테스트 ID는 테스트 코드의 가독성을 해치고 유지보수를 어렵게 만듭니다.
리팩토링 시 테스트 ID만 유지되면 거짓 양성(false positive)이 발생할 수 있습니다.

```tsx
// ❌ 나쁜 예: 사용자에게 보이지 않는 테스트 ID에 의존
test("장바구니 버튼 동작", () => {
  const { getByTestId } = render(<ProductPage />);
  fireEvent.click(getByTestId("add-to-cart-button"));
});

// ✅ 좋은 예: 사용자가 실제로 보는 텍스트/역할(Role)로 요소 찾기
test("장바구니 버튼 동작", () => {
  const { getByRole } = render(<ProductPage />);
  fireEvent.click(getByRole("button", { name: /장바구니 추가/i }));
});
```

<details>
<summary>React Testing Library 쿼리 조회 메소드 우선순위</summary>

> 참고: https://testing-library.com/docs/queries/about#priority

"테스트는 사용자가 코드(컴포넌트, 페이지 등)와 상호작용하는 방식을 최대한 유사하게 반영해야 합니다. 이를 고려하여 다음과 같은 우선순위를 권장합니다" 라고 권장하고 있습니다.
즉, 테스트 코드는 사용자가 실제로 보는 텍스트/역할(Role)로 요소 찾기를 권장하고 있습니다. 따라서 테스트 ID를 사용하는 것은 최후의 수단으로 사용해야 합니다.

</details>

### 컴포넌트 내부 상태를 직접 조작하지 않습니다.

사용자 인터랙션을 우회하여 컴포넌트 내부 상태를 직접 조작하지 않습니다. 이럴 경우 리팩토링 시 테스트가 깨지기 쉽습니다.

```tsx
// ❌ 나쁜 예: useState 값을 강제로 변경
test("장바구니 카운트 업데이트", () => {
  const { getByTestId } = render(<CartCounter />);
  // 내부 상태 강제 수정 (사용자가 절대 할 수 없는 행위)
  act(() => {
    setCartCount(5);
  });
  expect(getByTestId("cart-count")).toHaveTextContent("5");
});

// ✅ 좋은 예: 사용자 동작을 시뮬레이션 (버튼 클릭 등)
test("장바구니 카운트 업데이트", async () => {
  const user = userEvent.setup();
  const { getByRole, getByTestId } = render(<CartCounter />);

  await user.click(getByRole("button", { name: "추가" }));
  expect(getByTestId("cart-count")).toHaveTextContent("1");
});
```

### 불필요한 `act()` 사용을 피합니다.

RTL은 이미 내부적으로 `act()`를 처리하기때문에 중복 사용이므로 불필요합니다. React 18+에서는 오히려 경고 발생합니다.

```tsx
// ❌ 나쁜 예: 모든 상호작용을 act()로 감쌈
test("폼 제출", () => {
  const { getByLabelText } = render(<LoginForm />);
  act(() => {
    fireEvent.change(getByLabelText("이메일"), {
      target: { value: "test@test.com" },
    });
  });
});

// ✅ 좋은 예: 그냥 fireEvent나 userEvent 사용
test("폼 제출", async () => {
  const user = userEvent.setup();
  const { getByLabelText } = render(<LoginForm />);
  await user.type(getByLabelText("이메일"), "test@test.com");
});
```

### 쿼리 함수 선택 실수에 주의합니다.

```tsx
// ❌ 나쁜 예: 비동기 요소를 getByText로 찾기
test("데이터 로딩 후 표시", () => {
  render(<AsyncComponent />);
  expect(screen.getByText("로딩 완료")).toBeInTheDocument(); // 실패!
});

// ✅ 좋은 예: findBy* 사용
test("데이터 로딩 후 표시", async () => {
  render(<AsyncComponent />);
  expect(await screen.findByText("로딩 완료")).toBeInTheDocument();
});
```

### 불필요한 `cleanup()` 호출을 피합니다.

RTL v9+는 자동으로 cleanup 수행하므로 불필요합니다.

```tsx
// ❌ 불필요한 수동 클린업
afterEach(() => {
  cleanup();
});

// ✅ 아무것도 하지 않음 (자동 처리됨)
```

### 통합 테스트 시에는 전체 페이지 렌더링을 고려해야 합니다.

```tsx
// ❌ 나쁜 예: 단일 컴포넌트만 테스트 (통합 테스트 목적이면 부적절)
test("결제 플로우", () => {
  render(<PaymentButton />);
  // 결제 관련 Context/Redux가 연결되지 않음
});

// ✅ 좋은 예: 실제 사용 환경과 유사하게 전체 구성
test("결제 플로우", async () => {
  render(
    <PaymentProvider>
      <CartProvider>
        <CheckoutPage />
      </CartProvider>
    </PaymentProvider>
  );
  // 사용자 플로우 전체 테스트
});
```

## MSW 주의사항

### 서버 생명주기 관리 누락

MSW는 서버 생명주기를 관리하는 것이 중요합니다. 테스트 종료 시 모든 모의 서버를 정리해야 합니다.

```tsx
// ❌ 나쁜 예: 테스트 후 서버 종료 안 함 → 다른 테스트와 충돌
const server = setupServer(...handlers);

test("API 테스트", async () => {
  server.listen();
  // 테스트 실행
});

// ✅ 좋은 예: 테스트 수준에서 서버 관리
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### 핸들러 간 우선순위 오류

더 구체적인 핸들러가 먼저 등록되고 일반적인 핸들러가 나중에 등록되어야 합니다.

```tsx
// ❌ 나쁜 예: 더 구체적인 핸들러가 나중에 위치
server.use(
  rest.get("/api/users", generalHandler), // 먼저 등록
  rest.get("/api/users/admin", adminHandler) // 더 구체적이지만 나중
);

// ✅ 좋은 예: 더 구체적인 핸들러가 먼저 등록
server.use(
  rest.get("/api/users/admin", adminHandler), // 더 구체적인 핸들러 먼저
  rest.get("/api/users", generalHandler) // 일반적인 핸들러 나중
);
```

### 동일 엔드포인트 재정의 시 메모리 누수

```tsx
// ❌ 나쁜 예: 동일 엔드포인트 재정의 시 메모리 누수
test("A", () => {
  server.use(rest.get("/api/data", AHandler));
});

test("B", () => {
  // A의 핸들러가 여전히 활성화됨 😱
});

// ✅ 좋은 예: afterEach에서 server.resetHandlers() 필수
afterEach(() => server.resetHandlers());
```

### 응답 형식 일치여부 반드시 확인

테스트는 통과하지만 실제 환경에서 오류가 발생할 수 있습니다.

```tsx
// ❌ 실제 API와 다른 구조 반환
rest.get('/api/products', (req, res, ctx) => {
  return res(ctx.json({ products: [...] })); // 실제는 { data: [...] }
});
```

### 상태 코드 누락

```tsx
// ❌ 성공 시나리오만 테스트
rest.post("/api/login", (req, res, ctx) => {
  return res(ctx.json({ token: "fake" })); // 200 OK가 기본
});

// ✅ 명시적 상태 코드 설정
rest.post("/api/login", (req, res, ctx) => {
  return res(
    ctx.status(201), // 실제 API 스펙 반영
    ctx.json({ token: "fake" })
  );
});
```

### 동적 경로 처리 오류

```tsx
// ❌ 정적 경로만 처리
rest.get("/api/users/1", userHandler); // ID 하드코딩

// ✅ 동적 경로 매칭
rest.get("/api/users/:userId", (req, res, ctx) => {
  const { userId } = req.params;
  // userId 기반 응답
});
```

### 네트워크 에러 시뮬레이션

```tsx
// ❌ 단순 500 에러만 반환
rest.get("/api/data", (req, res, ctx) => {
  return res(ctx.status(500));
});

// ✅ 실제 네트워크 에러 유형 반영
rest.get("/api/data", (req, res, ctx) => {
  return res.networkError("Failed to connect");
});
```

### Context 유틸리티 잘 못 사용

```tsx
// ❌ 불필요한 지연 추가
rest.get("/api/data", (req, res, ctx) => {
  return res(
    ctx.delay(5000), // 모든 테스트에 5초 지연
    ctx.json(data)
  );
});

// ✅ 필요한 경우에만 지연 사용
rest.get("/api/data", (req, res, ctx) => {
  return process.env.NODE_ENV === "test"
    ? res(ctx.json(data))
    : res(ctx.delay(1000), ctx.json(data));
});
```

### 핸들러 내부 상태 공유는 테스트 간 간섭 유발

```tsx
let requestCount = 0; // ❌ 상태 공유는 테스트 간 간섭 유발

rest.get("/api/data", (req, res, ctx) => {
  requestCount++;
  return res(ctx.json({ count: requestCount }));
});

// ✅ 핸들러 내부에서 상태 관리
rest.get("/api/data", (req, res, ctx) => {
  let count = 0;
  return res(ctx.json({ count: ++count }));
});
```
