---
title: react-query
---

[React Query](https://tanstack.com/query/latest/docs/framework/react/overview)는 서버 상태를 관리하는 강력한 도구입니다. 이 가이드는 React Query를 사용해 서버 상태를 관리하는 프로젝트에서 일관되고 효율적인 방식으로 사용하기 위한 가이드입니다.

1. 서버 상태는 전역 상태 관리 도구(e.g., Redux, Zustand)로 처리하기에 부적합한 경우가 많습니다.
2. React Query는 캐싱, 리패칭, 데이터 동기화, 에러 핸들링 등을 손쉽게 지원합니다.
3. API 요청 로직을 단순화하고, 컴포넌트와 서버 상태를 적절히 분리합니다.

- [Mental Model](#mental-model)
- [폴더 구조](#폴더-구조)
- [Opinionated](#opinionated)
  - [커스텀 쿼리 훅](#커스텀-쿼리-훅)
  - [쿼리 키 전략](#쿼리-키-전략)
  - [쿼리 키 generator](#쿼리-키-generator)
  - [커스텀 쿼리 훅에서 Request가 객체 타입인 경우 쿼리 키는?](#커스텀-쿼리-훅에서-request가-객체-타입인-경우-쿼리-키는)
- [사용 가이드](#사용-가이드)
  - [Query 작성](#query-작성)
  - [Mutation 작성](#mutation-작성)
  - [refetch 전략](#refetch-전략)
  - [커스텀 쿼리 훅 options 확장](#커스텀-쿼리-훅-options-확장)
  - [에러 핸들링](#에러-핸들링)
  - [비동기 상태 관리에 대한 팁](#비동기-상태-관리에-대한-팁)
- [Tips](#tips)
  - [Query를 적극적으로 캐싱하세요](#query를-적극적으로-캐싱하세요)
  - [쿼리 키를 명확하게 유지](#쿼리-키를-명확하게-유지)
  - [Mutation Optimistic Update 활용](#mutation-optimistic-update-활용)
  - [개발 도구(Devtools) 사용](#개발-도구devtools-사용)

## Mental Model

**캐싱이 우선**

- React Query는 캐싱 중심 설계를 지향합니다. 데이터를 "가져오기(fetch)"보다는 "갱신하기(refetch)"를 목표로 합니다.

**불필요한 상태는 지양**

- 서버 상태는 React Query로 처리하고, 전역 상태 도구는 최소한으로 사용합니다.

**의도적으로 설계**

- React Query의 기능을 과도하게 사용하지 않고 필요한 부분에만 적용합니다.

## 폴더 구조

> [Folder Structure - api 폴더](../02-folder-structure.md#api-폴더) 참고

쿼리 폴더는 다음과 같은 구조로 작성합니다. Query, Mutation은 앱 전역에서 사용할 가능성이 높으므로 위치는 앱 전역에서 관리합니다.

```bash
./src/api
├── auth
│   ├── mutations
│   │   ├── types
│   │   │   └── post-register.ts
│   │   └── use-post-register-mutation.ts
│   ├── queries
│   │   ├── types
│   │   │   └── auth-status.ts
│   │   └── use-get-auth-status-query.ts

```

## Opinionated

### 커스텀 쿼리 훅

API 요청 로직을 커스텀 쿼리 훅으로 작성합니다.

**커스텀 쿼리 훅**

```ts
// 예시: src/api/auth/queries/use-get-auth-status-query.ts
import { useQuery } from "@tanstack/react-query";
import { client } from "@/api/client";

export const useGetAuthStatusQuery = () => {
  return useQuery({
    queryKey: ["api", "auth", "status"],
    queryFn: () => client.get("/api/auth/status"),
    select: (response) => response.data,
  });
};
```

**커스텀 뮤테이션 훅**

```ts
// 예시: src/api/auth/mutations/use-post-login-mutation.ts
import { useMutation } from "@tanstack/react-query";
import { client } from "@/api/client";
import { PostLoginRequest, PostLoginResponse } from "../types/post-login";

export const usePostLoginMutation = () => {
  return useMutation({
    mutationFn: (request: PostLoginRequest) =>
      client.post<PostLoginResponse>("/api/auth/login", request),
  });
};
```

### 쿼리 키 전략

쿼리 훅에 대한 쿼리 키는 API Endpoint url을 쿼리 키로 사용합니다. 이를 통해 다른 커스텀 쿼리 훅에서 동일 쿼리 키를 사용하더라도 캐싱 데이터를 공유할 수 있습니다.

```ts
// 예시: endpoint url: /api/auth/login
const query = useQuery({
  queryKey: ["api", "auth", "login"],
  queryFn: () => client.get<...>("/api/auth/login"),
});
```

### 쿼리 키 generator

쿼리 키는 항상 generator 함수를 만들어 사용합니다. 쿼리 훅에 속성으로 확장해서 사용합니다.
그래서 쿼리 훅을 사용하는 곳에서 재사용하기 쉽게 만들어 사용합니다.

```ts
// 예시: src/api/products/queries/use-get-product-detail-query.ts
import { useQuery } from "@tanstack/react-query";
import { client } from "@/api/client";

// 쿼리 훅
export const useGetProductDetailQuery = (productId: string) => {
  return useQuery({
    queryKey: generateQueryKey(productId),
    queryFn: () => client.get<...>(`/api/products/${productId}`),
  });
};

// 쿼리 키 generator
const generateQueryKey = (productId: string) => [
  "api",
  "products",
  productId,
];
// 쿼리 훅에 속성으로 확장
useGetProductDetailQuery.generateQueryKey = generateQueryKey;
```

### 커스텀 쿼리 훅에서 Request가 객체 타입인 경우 쿼리 키는?

> 이는 객체 내의 키 순서와 관계없이 모든 쿼리들이 동일하게 취급됩니다.  
> [Query Keys are Hashed Deterministically](https://tanstack.com/query/v3/docs/framework/react/guides/query-keys#query-keys-are-hashed-deterministically)

request 타입이 객체인 경우 search query param은 qs 라이브러리를 사용하지만 쿼리 키에는 객체 형태로 포함시킵니다.

```ts
// 아래 쿼리 키들은 동일하게 취급됩니다.
useQuery(['todos', { status, page }], ...)
useQuery(['todos', { page, status }], ...)
useQuery(['todos', { page, status, other: undefined }], ...)
```

```ts
// 예시: endpoint url: /api/products?search=apple&category=fruit
const useGetProductListQuery = (request: GetProductListRequest) => {
  const queryKey = generateQueryKey(request)

  return useQuery({
    queryKey: queryKey(request),
    queryFn: () => client.get<...>(`/api/products?${qs.stringify(request)}`),
  });
};

const generateQueryKey = (request: GetProductListRequest) => [
  "api",
  "products",
  request,
];
useGetProductListQuery.generateQueryKey = generateQueryKey;
```

## 사용 가이드

### Query 작성

`useQuery` 훅을 사용해 데이터를 가져올 때, 항상 **query key**를 명확히 정의합니다.
**query key**는 데이터의 고유성을 보장해야 하며, 배열을 사용하는 것을 추천합니다.

```ts
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "./api";

const Todos = () => {
  const { data, isLoading, error } = useQuery(["todos"], fetchTodos);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred!</p>;

  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};
```

### Mutation 작성

데이터를 생성, 수정, 삭제할 때는 `useMutation`을 사용합니다. `onSuccess`를 통해 관련된 쿼리를 `invalidate`하여 캐시를 갱신하세요.
또는 `mutateAsync`를 사용해 비동기 작업을 처리할 수 있습니다.

```ts
// onSuccess 사용
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo } from "./api";

const AddTodo = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]); // todos 쿼리 갱신
    },
  });

  const handleAdd = async () => {
    mutation.mutate({ title: "New Todo" });
  };

  return <button onClick={handleAdd}>Add Todo</button>;
};

// mutateAsync 사용
import { useMutation } from "@tanstack/react-query";
import { addTodo } from "./api";

const AddTodo = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(addTodo);

  const handleAdd = async () => {
    try {
      await mutation.mutateAsync({ title: "New Todo" });

      // 쿼리 키 갱신
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };
```

### refetch 전략

refetch 전략은 쿼리 키를 통해 캐싱된 데이터를 갱신하는 방법입니다.

> invalidation은 더 "스마트한" refetching입니다. Refetching은 쿼리에 대한 관찰자가 없더라도 항상 재요청을 수행합니다. 반면 invalidation은 단순히 데이터를 stale(오래된) 상태로 표시하여 다음에 관찰자가 마운트될 때 재요청이 이루어지도록 합니다. 활성화된 관찰자가 있는 쿼리의 경우, 제가 아는 한 두 방식 간의 차이는 없습니다.  
> refetch는 단순히 enabled: false를 우회하기 위한 명령형 접근 방식(제가 개인적으로 선호하지 않는)을 위해 제공됩니다.  
> 일반적으로 무효화(invalidation)와 실제 쿼리를 보여주는 것은 같은 컴포넌트에서 일어나지 않습니다. 무효화는 주로 mutation의 결과로 발생하며, 이는 useMutation을 감싸는 커스텀 훅이 어딘가에 있다는 것을 의미합니다. 그 훅은 useQuery의 반환 값에 접근할 수 없기 때문에 여기서는 도움이 되지 않습니다. 둘 다 같은 컴포넌트에 있는 경우는 드물며, 그러한 경우에 코드 한 줄을 추가하는 것은 크게 문제가 되지 않습니다.  
> [refetch 전략 - TkDodo 답변](https://github.com/TanStack/query/discussions/2468#discussioncomment-1012637)

- `queryClient.invalidateQueries`: 쿼리를 무효화하고 백그라운드에서 자동으로 refetch를 수행합니다. 여러 쿼리를 한 번에 무효화할 수 있으며, 부분적 키 매칭도 지원합니다.
- `useQuery().refetch`: 특정 쿼리를 수동으로 즉시 refetch 합니다. 사용자 액션에 의한 명시적 갱신이 필요할 때 사용합니다.

위 두 가지 방법은 상황에 따라 사용하는 것을 권장합니다.

#### invalidation: Mutation 후 쿼리 갱싱

> 예시: 제품 등록 후 제품 목록 조회

Mutation 후 쿼리 갱신은 invalidation이 적절합니다.

1. 데이터의 일관성: invalidation은 해당 쿼리와 관련된 모든 캐시를 무효화하여 데이터 일관성을 보장합니다.
2. 자동 리패칭: 활성화된 쿼리의 경우 자동으로 리패칭이 발생하여 최신 데이터를 유지합니다.
3. 성능 최적화: 비활성 쿼리는 단순히 stale 상태로 표시되어, 다음 마운트 시점에 리패칭됩니다.

```ts
// 예시: 제품 등록 후 제품 목록 갱신
const queryHook = useGetProductListQuery();
const mutation = useMutation({
  mutationFn: (newProduct: Product) => client.post("/api/products", newProduct),
  onSuccess: () => {
    // 제품 목록 쿼리 무효화
    queryClient.invalidateQueries({
      queryKey: queryHook.generateQueryKey(),
    });
  },
});
```

#### refetch: 명시적 쿼리 갱싱

> 예시: 동일 조회 조건으로 재 조회

명시적 쿼리 갱신이 필요한 경우에는 `refetch`를 사용합니다. 그 이유는

1. 직접적인 데이터 갱신: 사용자의 명시적인 액션(예: '새로고침' 버튼 클릭)에 응답하여 즉시 데이터를 갱신해야 할 때 적합합니다.
2. 조건부 쿼리 갱신: `enabled: false` 상태의 쿼리를 강제로 실행해야 할 때 유용합니다.
3. 즉각적인 피드백: 사용자에게 데이터가 실시간으로 갱신되고 있다는 것을 명확하게 보여줄 수 있습니다.

```ts
// 예시: 동일 조회 조건으로 재 조회

function useGetProductListQuery() {
  return useQuery({
    queryKey: ["api", "products"],
    queryFn: () => client.get<...>(`/api/products`),
    enabled: false,
  });
}

const queryHook = useGetProductListQuery();
queryHook.refetch();
```

### 커스텀 쿼리 훅 options 확장

커스텀 쿼리 훅(또는 뮤테이션)을 만들 때 params로 options를 확장해서 사용할 수도 있습니다.

```ts
// 예시: src/api/products/queries/use-get-product-list-query.ts

export const useGetProductListQuery = (options: UseQueryOptions) => {
  return useQuery({
    queryKey: ["api", "products"],
    queryFn: () => client.get<...>(`/api/products`),
    ...options,
  });
};
```

### 에러 핸들링

에러 핸들링을 일관되게 처리하세요. `useQuery`나 `useMutation`에서 `onError`를 설정하거나, React Query의 `QueryErrorBoundary`를 활용합니다.

**onError 사용**

```tsx
import { useProductListQuery } from "@/api/products/queries/use-get-product-list-query";

function Component() {
  const { data, isLoading, error } = useProductListQuery({
    onError: (error) => {
      console.error("Error fetching product list:", error);
      toast.error("제품 목록을 불러오는 중 오류가 발생했습니다.");
    },
  });

  return (
    <div>
      <p>{data}</p>
    </div>
  );
}
```

**QueryErrorBoundary 사용**

```tsx
import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ error }) => <p>{error.message}</p>}
          >
            <MyApp />
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  );
}
```

### 비동기 상태 관리에 대한 팁

#### isLoading과 isFetching 구분

- `isLoading`: 쿼리의 첫 번째 데이터 로딩 시에만 `true`가 됩니다. 이는 `isPending && isFetching`이 `true`일 때를 의미하며, 아직 데이터가 한 번도 로드되지 않은 상태에서의 초기 로딩 상태를 나타냅니다.
- `isFetching`: 쿼리 함수가 실행 중일 때마다 `true`가 됩니다. 이는 초기 데이터 로딩과 백그라운드 리패칭(refetching) 모두를 포함합니다.

```tsx
function TodoList() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isLoading) return "데이터를 처음 불러오는 중...";
  if (isFetching) return "데이터를 갱신하는 중...";

  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

#### 데이터 비우기

데이터를 조건적으로 렌더링할 때 `stale` 상태를 고려하여 항상 기본 값을 처리하세요.

## Tips

### Query를 적극적으로 캐싱하세요

`staleTime`과 `cacheTime`을 설정하여 불필요한 네트워크 요청을 줄입니다.

```ts
useQuery(["todos"], fetchTodos, {
  staleTime: 1000 * 60, // 1분간 데이터를 신선하게 유지
  cacheTime: 1000 * 60 * 5, // 5분 후 캐시 삭제
});
```

### 쿼리 키를 명확하게 유지

쿼리 키는 고유성을 보장하며 데이터 스코프를 나타내야 합니다.

### Mutation Optimistic Update 활용

사용자 경험을 향상시키기 위해 Optimistic Update를 적극적으로 활용하세요.

```ts
useMutation(updateTodo, {
  onMutate: async (newTodo) => {
    await queryClient.cancelQueries(["todos"]);
    const previousTodos = queryClient.getQueryData(["todos"]);
    queryClient.setQueryData(["todos"], (old) =>
      old.map((todo) => (todo.id === newTodo.id ? newTodo : todo))
    );
    return { previousTodos };
  },
  onError: (err, newTodo, context) => {
    queryClient.setQueryData(["todos"], context.previousTodos);
  },
});
```

### 개발 도구(Devtools) 사용

[React Query Devtools](https://react-query.tanstack.com/devtools)를 사용해 쿼리 상태를 실시간으로 점검하세요.

```tsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```
