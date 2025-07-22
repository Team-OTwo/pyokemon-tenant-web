---
title: React
---

이 가이드는 React를 사용한 프론트엔드 개발 시 참고해야 할 가이드 및 모범 사례와 주요 개념들을 다룹니다.

## Opinionated

React 개발 시 우리 팀이 선호하는 방식과 규칙들입니다:

### 상태 관리 구분

로컬 상태과 전역 상태, 서버 상태를 잘 구분하여 사용합니다. 그래서 전역 상태 라이브러리(Zustand)를 꼭 써야하는 환경에서만 사용합니다.

- 로컬 상태: `useState`/`useReducer` 사용
- 전역 상태: Zustand 사용
- 서버 상태: React Query 사용
- Context API: 테마/인증 등 정적인 값에만 사용

### useEffect 사용 고려

> `useEffect`가 정말 필요한지 검토하기

#### `useEffect`는 사이드 이펙트를 처리하기 위한 훅으로 불필요한 사이드 이펙트는 피합니다.

```tsx
// ❌ 잘못된 사용: 렌더링과 관련된 계산에 useEffect 사용
function ProductPrice({ price, discount }) {
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    setFinalPrice(price * (1 - discount));
  }, [price, discount]);

  return <div>{finalPrice}원</div>;
}

// ✅ 올바른 사용: 렌더링 중에 직접 계산
function ProductPrice({ price, discount }) {
  const finalPrice = price * (1 - discount);

  return <div>{finalPrice}원</div>;
}

// ✅ 올바른 useEffect 사용: 외부 시스템과의 동기화
function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();

    return () => connection.disconnect();
  }, [roomId]);

  return <div>채팅방 {roomId}</div>;
}
```

#### 비즈니스 로직 또는 단순 데이터 변환은 `useEffect` 안에 넣기보다, 컴포넌트 렌더링 시 바로 계산되도록 처리합니다.

```tsx
// ❌ 잘못된 사례: useEffect로 데이터 변환
function ProductList({ products }) {
  const [formattedProducts, setFormattedProducts] = useState([]);

  useEffect(() => {
    const formatted = products.map((product) => ({
      ...product,
      price: `${product.price.toLocaleString()}원`,
      isOnSale: product.discountRate > 0,
    }));
    setFormattedProducts(formatted);
  }, [products]);

  return (
    <ul>
      {formattedProducts.map((product) => (
        <li key={product.id}>
          {product.name} - {product.price}
        </li>
      ))}
    </ul>
  );
}

// ✅ 올바른 사례: 렌더링 중에 직접 데이터 변환
function ProductList({ products }) {
  const formattedProducts = products.map((product) => ({
    ...product,
    price: `${product.price.toLocaleString()}원`,
    isOnSale: product.discountRate > 0,
  }));

  return (
    <ul>
      {formattedProducts.map((product) => (
        <li key={product.id}>
          {product.name} - {product.price}
        </li>
      ))}
    </ul>
  );
}
```

#### `useMemo`나 `useCallback`으로 의존성을 관리할 수 있는 경우 `useEffect`를 피합니다.

```tsx
// 잘못된 사례
useEffect(() => {
  const computedValue = calculateSomething(props.data);
  setState(computedValue);
}, [props.data]);

// 올바른 사례
const computedValue = useMemo(
  () => calculateSomething(props.data),
  [props.data]
);
```

#### `useEffect` 하나에 여러 가지 작업을 처리하지 않고, 작업을 분리하여 필요한 만큼의 `useEffect`만 사용합니다.

```jsx
// 잘못된 사례
useEffect(() => {
  fetchData();
  setupEventListener();
}, []);

// 올바른 사례
useEffect(() => fetchData(), []);
useEffect(() => setupEventListener(), []);
```

#### 이벤트로 처리할 수 있는 로직은 useEffect 대신 이벤트 핸들러에서 직접 처리합니다.

```tsx
// ❌ 잘못된 사례: useEffect로 이벤트 처리
function SaveButton({ data }) {
  useEffect(() => {
    if (data.isDirty) {
      saveData();
      showToast("저장되었습니다");
    }
  }, [data.isDirty]);

  return <button>저장</button>;
}

// ✅ 올바른 사례: 이벤트 핸들러에서 직접 처리
function SaveButton({ data }) {
  const handleSave = async () => {
    await saveData();
    showToast("저장되었습니다");
  };

  return <button onClick={handleSave}>저장</button>;
}
```

### 컴포넌트 구조 고민

컴포넌트 구조는 성급하게 쪼개지 않습니다. 중복을 허용하더라도 읽기 쉬운 컴포넌트 작성을 우선합니다.

- 컴포넌트는 기본적으로 함수형 컴포넌트로 작성
- Props 타입은 항상 명시적으로 정의
- 컴포넌트 파일은 단일 책임 원칙 준수
- 스타일은 CSS-in-JS로 관리 (styled-components)

### 성급한 성능 최적화

> useMemo, useCallback, React.memo 등 메모아이제이션 최적화는 실제 성능 이슈가 발생한 경우에만 사용합니다.  
> 다만, 성능에 영향을 줄 가능성이 매우 높은 곳에는 미리 적용할 수 있습니다.

- 무분별한 최적화는 지양 (premature optimization)
- React.memo는 실제 성능 이슈가 있을 때만 사용
- 큰 리스트는 가상화 (react-window/react-virtualized)
- 이미지는 lazy loading 적용

### UI와 비지니스 코드 구분

UI를 담당하는 컴포넌트와 비지니스를 담당하는 커스텀 훅, 유틸리티, 상수 등을 적절히 분리하여 사용합니다.

- 비즈니스 로직은 custom hooks로 분리
- 재사용 가능한 UI는 컴포넌트로 분리
- 유틸리티 함수는 별도 모듈로 관리
- 상수는 constants 파일로 분리

### 테스트

통합 테스트 위주로 테스트를 진행하며, E2E 테스트는 최소화합니다.
결국 단위 테스트가 가장 많고 그 다음 통합 테스트가 많습니다.

- 컴포넌트는 React Testing Library로 테스트
- 로직은 Vitest + RTL + MSW로 단위 테스트, 통합 테스트
- E2E 테스트는 Playwright 사용
- 스냅샷 테스트는 최소화

### 개발 Tooling

개발자 경험 향상과 레파지토리 관리 편의성을 위해 다음 도구를 사용합니다.

- ESLint + Prettier 사용
- Husky(pre-commit hook)로 커밋 전 린트/테스트 실행
- Chrome React DevTools 활용 권고

## Tips

- [React 개발 팁](#react-개발-팁)
  - [Provider 랩핑 헬을 피하세요. 대신 컴포지션을 사용하여 여러 Provider를 합치세요](#provider-랩핑-헬을-피하세요-대신-컴포지션을-사용하여-여러-provider를-합치세요)
  - [useEffect에서 ref 변경을 정확히 감지할 수 없습니다. 대신 ref callback 함수를 사용하세요.](#useeffect에서-ref-변경을-정확히-감지할-수-없습니다-대신-ref-callback-함수를-사용하세요)
  - [대규모 리스트 렌더링을 virtualize하세요.](#대규모-리스트-렌더링을-virtualize하세요)
  - [prop drilling을 피하세요. 대신 Composition 컴포넌트를 활용하세요.](#prop-drilling을-피하세요-대신-composition-컴포넌트를-활용하세요)
  - [Dynamic 컴포넌트 타입에 Any를 쓰지마세요. 대신 Generic Type을 쓰세요.](#dynamic-컴포넌트-타입에-any를-쓰지마세요-대신-generic-type을-쓰세요)
  - [Dynamic Prop 타입을 느슨하게 하지마세요. 대신 Union Type을 이용해 명시적으로 사용하세요.](#dynamic-prop-타입을-느슨하게-하지마세요-대신-union-type을-이용해-명시적으로-사용하세요)
  - [useState는 비동기라는 것을 기억하세요. 비동기 동작이기에 최신값이 아닐 수 있습니다. 상태를 직접 바라보고 최신값을 사용하세요.](#usestate는-비동기라는-것을-기억하세요-비동기-동작이기에-최신값이-아닐-수-있습니다-상태를-직접-바라보고-최신값을-사용하세요)
  - [input 상태는 기본값을 넣어주어야 합니다. 타입에 맞는 기본값을 넣어주세요.](#input-상태는-기본값을-넣어주어야-합니다-타입에-맞는-기본값을-넣어주세요)
  - [useEffect 내에서 무한 루프를 주의하세요. useEffect를 사용하지 않고도 문제를 해결할수도 있습니다.](#useeffect-내에서-무한-루프를-주의하세요-useeffect를-사용하지-않고도-문제를-해결할수도-있습니다)
  - [상태가 Object인 경우 새로운 값으로 migrate할 때 주의하세요. 반드시 immutable 한 값으로 처리하세요.(비구조화 등)](#상태가-object인-경우-새로운-값으로-migrate할-때-주의하세요-반드시-immutable-한-값으로-처리하세요비구조화-등)
  - [비즈니스 로직을 UI에서 분리하세요. 대신 custom hook과 util로 분리하세요.](#비즈니스-로직을-ui에서-분리하세요-대신-custom-hook과-util로-분리하세요)
  - [useState를 복잡한 상태 관리로 사용하는 것을 피하세요. 대신 useReducer를 사용하세요.](#usestate를-복잡한-상태-관리로-사용하는-것을-피하세요-대신-usereducer를-사용하세요)
  - [불필요한 useEffect 사용을 피하세요. 대신 그냥 최신 상태를 사용하세요.](#불필요한-useeffect-사용을-피하세요-대신-그냥-최신-상태를-사용하세요)
  - [any를 사용하지 마세요. infer된 타입을 사용하세요.](#any를-사용하지-마세요-infer된-타입을-사용하세요)
  - [리액트의 defaultProps를 사용하는 것을 피하세요. 대신 default params를 사용하세요.](#리액트의-defaultprops를-사용하는-것을-피하세요-대신-default-params를-사용하세요)
  - [event 타입을 암묵적 any 타입으로 쓰는 것을 피하세요.](#event-타입을-암묵적-any-타입으로-쓰는-것을-피하세요)
  - [이벤트 핸들러를 useEffect 안에 넣는 것을 피하세요. 대신 이벤트 핸들러를 바로 사용하세요.](#이벤트-핸들러를-useeffect-안에-넣는-것을-피하세요-대신-이벤트-핸들러를-바로-사용하세요)
  - [이른 최적화를 피하세요. React.memo는 최후 수단으로 사용하세요. composition, relocate state 등 다양한 방법을 우선 사용해보세요.](#이른-최적화를-피하세요-reactmemo는-최후-수단으로-사용하세요-composition-relocate-state-등-다양한-방법을-우선-사용해보세요)
  - [만약 useEffect를 통한 data fetch를 해야만 하는 경우 racing condition을 피하도록 abort controller API를 사용하세요.](#만약-useeffect를-통한-data-fetch를-해야만-하는-경우-racing-condition을-피하도록-abort-controller-api를-사용하세요)
  - [isLoading(boolean)을 별도 상태로 선언해서 사용하는 것을 피하세요. 대신 데이터를 직접 바라보고 source of truth관점에서 선언해서 사용하세요.](#isloadingboolean을-별도-상태로-선언해서-사용하는-것을-피하세요-대신-데이터를-직접-바라보고-source-of-truth관점에서-선언해서-사용하세요)
- [성급한 컴포넌트 쪼개기 방지](#성급한-컴포넌트-쪼개기-방지)
  - [컴포넌트 분리가 필요한 경우](#컴포넌트-분리가-필요한-경우)
  - [불필요한 분리를 피해야 하는 경우](#불필요한-분리를-피해야-하는-경우)
  - [컴포넌트 분리 시 고려사항](#컴포넌트-분리-시-고려사항)
- [useEffect가 필요하지 않은 경우](#useeffect가-필요하지-않은-경우)
  - [렌더링을 위한 데이터 변환](#렌더링을-위한-데이터-변환)
  - [Props 변경에 따른 State 업데이트](#props-변경에-따른-state-업데이트)
  - [이벤트 핸들링](#이벤트-핸들링)
  - [부모 컴포넌트 업데이트 트리거](#부모-컴포넌트-업데이트-트리거)
  - [애플리케이션 초기화](#애플리케이션-초기화)
  - [useEffect가 실제로 필요한 경우](#useeffect가-실제로-필요한-경우)
  - [useEffect가 실제로 필요한 경우](#useeffect가-실제로-필요한-경우-1)
- [안티 패턴](#안티-패턴)
  - [`useState` 대신 변수 사용 금지](#usestate-대신-변수-사용-금지)
  - [컴포넌트 외부에 CSS 선언](#컴포넌트-외부에-css-선언)
  - [`useCallback`으로 함수 재생성 방지](#usecallback으로-함수-재생성-방지)
  - [`useCallback`으로 의존성 변경 방지](#usecallback으로-의존성-변경-방지)
  - [`useCallback`으로 `useEffect` 트리거 방지](#usecallback으로-useeffect-트리거-방지)
  - [`useEffect`에 빈 의존성 배열 추가 (의존성 없을 때만)](#useeffect에-빈-의존성-배열-추가-의존성-없을-때만)
  - [모든 의존성을 `useEffect`에 명시](#모든-의존성을-useeffect에-명시)
  - [외부 코드 초기화에 `useEffect` 사용 금지](#외부-코드-초기화에-useeffect-사용-금지)
  - [외부 함수를 `useCallback`으로 감싸지 않기](#외부-함수를-usecallback으로-감싸지-않기)
  - [빈 의존성 배열과 `useMemo` 사용 금지](#빈-의존성-배열과-usememo-사용-금지)
  - [컴포넌트 내부에 컴포넌트 선언 금지](#컴포넌트-내부에-컴포넌트-선언-금지)
  - [조건문/return 이후 훅 사용 금지](#조건문return-이후-훅-사용-금지)
  - [자식 컴포넌트가 렌더링 여부 결정하도록 허용](#자식-컴포넌트가-렌더링-여부-결정하도록-허용)
  - [복수 `useState` 대신 `useReducer` 사용](#복수-usestate-대신-usereducer-사용)
  - [초기 상태를 객체 대신 함수로 작성](#초기-상태를-객체-대신-함수로-작성)
  - [리렌더링 방지를 위해 `useRef` 사용](#리렌더링-방지를-위해-useref-사용)
- [React 19](#react-19)
  - [React](#react)
  - [React DOM](#react-dom)
  - [React DOM 클라이언트](#react-dom-클라이언트)
  - [React DOM 서버](#react-dom-서버)
  - [React 서버 컴포넌트](#react-서버-컴포넌트)
  - [TypeScript 변경 사항](#typescript-변경-사항)
  - [Deprecated](#deprecated)

## React 개발 팁

> https://alexsidorenko.com/

### Provider 랩핑 헬을 피하세요. 대신 컴포지션을 사용하여 여러 Provider를 합치세요

여러 Provider를 중첩해서 사용하면 코드가 복잡해지고 가독성이 떨어집니다.

```tsx
// ❌ Provider 중첩 지옥
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <SettingsProvider>
            <NotificationProvider>
              <Router>
                <Layout>
                  <MainContent />
                </Layout>
              </Router>
            </NotificationProvider>
          </SettingsProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
```

대신 Provider를 하나의 컴포넌트로 합치거나, 컴포지션 패턴을 사용하세요:

```tsx
const providers = [
  [ThemeProvider, themeProps],
  [AuthProvider, authProps],
  [UserProvider, userProps],
  [SettingsProvider, settingsProps],
  [NotificationProvider, notificationProps],
];

// ✅ 컴포지션 패턴 사용
const AppProviders = ({ children }) => {
  return providers.reduce(
    (acc, [Provider, props]) => <Provider {...props}>{acc}</Provider>,
    children
  );
};

function App() {
  return (
    <AppProviders>
      <Router>
        <Layout>
          <MainContent />
        </Layout>
      </Router>
    </AppProviders>
  );
}
```

### useEffect에서 ref 변경을 정확히 감지할 수 없습니다. 대신 ref callback 함수를 사용하세요.

useEffect는 ref 객체의 `.current` 속성 변경을 감지하지 못합니다. 대신 ref callback을 사용하세요:

```tsx
// ❌ useEffect로는 ref 변경을 감지할 수 없음
function Example() {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // elementRef.current가 변경되어도 이 효과는 실행되지 않음
    console.log(elementRef.current);
  }, [elementRef.current]); // 의존성 배열에 ref.current를 넣어도 동작하지 않음

  return <div ref={elementRef}>내용</div>;
}

// ✅ ref callback 함수 사용
function Example() {
  const [height, setHeight] = useState(0);

  const measureRef = useCallback((element: HTMLDivElement | null) => {
    if (element) {
      // element가 DOM에 마운트되거나 업데이트될 때마다 실행됨
      setHeight(element.getBoundingClientRect().height);
    }
  }, []);

  return <div ref={measureRef}>내용</div>;
}
```

### 대규모 리스트 렌더링을 virtualize하세요.

대규모 리스트를 렌더링할 때는 성능 최적화를 위해 가상화(virtualization)를 사용하세요. 가상화는 현재 화면에 보이는 항목만 렌더링하고 나머지는 필요할 때 렌더링하는 기법입니다.

```tsx
// ❌ 모든 항목을 한 번에 렌더링
function LargeList({ items }) {
  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>{item.content}</div>
      ))}
    </div>
  );
}

// ✅ react-window를 사용한 가상화
import { FixedSizeList } from "react-window";

function LargeList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>{items[index].content}</div>
  );

  return (
    <FixedSizeList
      height={400}
      width={300}
      itemCount={items.length}
      itemSize={35}
    >
      {Row}
    </FixedSizeList>
  );
}
```

가상화를 위해 다음과 같은 라이브러리를 사용할 수 있습니다:

- **react-window**: 경량화된 가상화 라이브러리
- **react-virtualized**: 더 많은 기능을 제공하는 가상화 라이브러리
- **react-virtual**: 최신 훅 기반 가상화 라이브러리

### prop drilling을 피하세요. 대신 Composition 컴포넌트를 활용하세요.

prop drilling은 여러 계층의 컴포넌트를 거쳐 props를 전달하는 것을 의미합니다. 이는 코드의 유지보수를 어렵게 만들 수 있습니다.

```tsx
// ❌ Prop Drilling - props가 여러 계층을 거쳐 전달됨
function TodoList({ todos, onToggle }) {
  return (
    <div>
      <TodoItems todos={todos} onToggle={onToggle} />
    </div>
  );
}

function TodoItems({ todos, onToggle }) {
  return todos.map((todo) => (
    <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
  ));
}

function TodoItem({ todo, onToggle }) {
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      {todo.text}
    </div>
  );
}

// ✅ Composition 패턴 - 컴포넌트를 조합하여 사용
function TodoList({ todos }) {
  const handleToggle = (id) => {
    // 토글 로직
  };

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id}>
          <Checkbox
            checked={todo.completed}
            onChange={() => handleToggle(todo.id)}
          />
          <span>{todo.text}</span>
        </TodoItem>
      ))}
    </div>
  );
}

const TodoItem = ({ children }) => <div>{children}</div>;
const Checkbox = ({ checked, onChange }) => (
  <input type="checkbox" checked={checked} onChange={onChange} />
);
```

### Dynamic 컴포넌트 타입에 Any를 쓰지마세요. 대신 Generic Type을 쓰세요.

```tsx
// ❌ any 타입 사용
const DynamicComponent = ({ as: Component, ...props }: { as: any }) => {
  return <Component {...props} />;
};

// ✅ Generic Type 사용
type DynamicComponentProps<T extends React.ElementType> = {
  as: T;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

const DynamicComponent = <T extends React.ElementType = 'div'>({
  as: Component,
  children,
  ...props
}: DynamicComponentProps<T>) => {
  return <Component {...props}>{children}</Component>;
};

// 사용 예시
<DynamicComponent as="button" onClick={() => {}} type="submit">
  클릭
</DynamicComponent>

<DynamicComponent as="a" href="https://example.com">
  링크
</DynamicComponent>
```

### Dynamic Prop 타입을 느슨하게 하지마세요. 대신 Union Type을 이용해 명시적으로 사용하세요.

```tsx
// ❌ 느슨한 타입 정의
type ButtonProps = {
  variant: string;  // 어떤 문자열이든 허용됨
  size: string;
};

// ✅ Union Type으로 명시적 정의
type ButtonProps = {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'small' | 'medium' | 'large';
};

const Button = ({ variant, size, children }: ButtonProps) => {
  return (
    <button className={`btn-${variant} btn-${size}`}>
      {children}
    </button>
  );
};

// 사용 예시
<Button variant="primary" size="medium">클릭</Button>  // ✅ 타입 체크 통과
<Button variant="invalid" size="wrong">에러</Button>   // ❌ 타입 에러
```

### useState는 비동기라는 것을 기억하세요. 비동기 동작이기에 최신값이 아닐 수 있습니다. 상태를 직접 바라보고 최신값을 사용하세요.

```tsx
// ❌ 이전 상태값을 참조할 수 있음
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);

    const isTwo = isCountTwo(count);
  };

  return <button onClick={handleClick}>{count}</button>;
}

// ✅ 업데이트 함수를 사용하여 최신 상태 보장
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  const isTwo = isCountTwo(count);

  return <button onClick={handleClick}>{count}</button>;
}
```

### input 상태는 기본값을 넣어주어야 합니다. 타입에 맞는 기본값을 넣어주세요.

```tsx
// ❌ 기본값 없이 input 상태 사용
const [text, setText] = useState<string>();
const [count, setCount] = useState<number>();
const [checked, setChecked] = useState<boolean>();

// ✅ 타입에 맞는 기본값 설정
const [text, setText] = useState<string>("");
const [count, setCount] = useState<number>(0);
const [checked, setChecked] = useState<boolean>(false);

// 사용 예시
function Form() {
  const [name, setName] = useState<string>(""); // 빈 문자열로 초기화
  const [age, setAge] = useState<number>(0); // 숫자 0으로 초기화
  const [isAgree, setIsAgree] = useState<boolean>(false); // false로 초기화

  return (
    <form>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
      />
      <input
        type="checkbox"
        checked={isAgree}
        onChange={(e) => setIsAgree(e.target.checked)}
      />
    </form>
  );
}
```

### useEffect 내에서 무한 루프를 주의하세요. useEffect를 사용하지 않고도 문제를 해결할수도 있습니다.

```tsx
// ❌ 무한 루프 발생
function Counter() {
  const [value, setValue] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(value + 1); // 상태 업데이트가 다시 effect를 트리거
  }, [count, value]); // count, value가 변경될 때마다 effect 실행

  return (
    <div>
      <input
        type="text"
        value={value}
        onClick={(e) => setValue(e.target.value)}
      />
      Count is {count}
    </div>
  );
}

// ✅ 불필요한 useEffect 제거
function Counter() {
  const [value, setValue] = useState(0);

  const count = value + 1;

  return (
    <div>
      <input
        type="text"
        value={value}
        onClick={(e) => setValue(e.target.value)}
      />
      Count is {count}
    </div>
  );
}
```

### 상태가 Object인 경우 새로운 값으로 migrate할 때 주의하세요. 반드시 immutable 한 값으로 처리하세요.(비구조화 등)

```tsx
// ❌ 직접 객체 수정 - mutable
function UserProfile() {
  const [user, setUser] = useState({ name: "홍길동", age: 30 });

  const updateAge = () => {
    user.age += 1; // 직접 수정하면 React가 변경을 감지하지 못함
    setUser(user);
  };

  return <button onClick={updateAge}>나이 증가</button>;
}

// ✅ 새로운 객체 생성 - immutable
function UserProfile() {
  const [user, setUser] = useState({ name: "홍길동", age: 30 });

  const updateAge = () => {
    setUser({
      ...user, // 기존 속성 복사
      age: user.age + 1, // 새로운 값으로 업데이트
    });
  };

  return <button onClick={updateAge}>나이 증가</button>;
}
```

### 비즈니스 로직을 UI에서 분리하세요. 대신 custom hook과 util로 분리하세요.

```tsx
// ❌ UI와 비즈니스 로직이 혼재된 컴포넌트
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생!</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

// ✅ 비즈니스 로직을 custom hook으로 분리
function useUser(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  return { user, loading, error };
}

// ✅ UI 로직만 남은 깔끔한 컴포넌트
function UserProfile({ userId }) {
  const { user, loading, error } = useUser(userId);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생!</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

### useState를 복잡한 상태 관리로 사용하는 것을 피하세요. 대신 useReducer를 사용하세요.

```tsx
// ❌ 여러 개의 연관된 상태를 useState로 관리
function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [max, setMax] = useState(10);

  const increment = () => {
    if (count + step <= max) {
      setCount(count + step);
    }
  };

  const updateStep = (newStep: number) => {
    setStep(newStep);
    if (count + newStep > max) {
      setCount(max);
    }
  };
}

// ✅ useReducer로 연관된 상태를 하나로 관리
type State = {
  count: number;
  step: number;
  max: number;
};

type Action = { type: "increment" } | { type: "setStep"; payload: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        count: Math.min(state.count + state.step, state.max),
      };
    case "setStep":
      return {
        ...state,
        step: action.payload,
        count: Math.min(state.count, state.max),
      };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    step: 1,
    max: 10,
  });

  return (
    <div>
      <button onClick={() => dispatch({ type: "increment" })}>
        증가 ({state.count})
      </button>
      <input
        type="number"
        value={state.step}
        onChange={(e) =>
          dispatch({
            type: "setStep",
            payload: Number(e.target.value),
          })
        }
      />
    </div>
  );
}
```

### 불필요한 useEffect 사용을 피하세요. 대신 그냥 최신 상태를 사용하세요.

```tsx
// ❌ 불필요한 useEffect 사용
function Profile({ user }) {
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    setFullName(`${user.firstName} ${user.lastName}`);
  }, [user.firstName, user.lastName]);

  return <div>{fullName}</div>;
}

// ✅ 직접 계산하여 사용
function Profile({ user }) {
  const fullName = `${user.firstName} ${user.lastName}`;

  return <div>{fullName}</div>;
}
```

### any를 사용하지 마세요. infer된 타입을 사용하세요.

```tsx
// 기존 객체/값으로부터 타입 추론하기
const user = {
  id: 1,
  name: "홍길동",
  age: 30,
  email: "hong@example.com",
} as const;

// ❌ 함수 파라미터에 any 사용
function processUser(user: any) {
  console.log(user.name);
}

// ✅ typeof로 추론된 타입 사용
function processUser(user: typeof user) {
  console.log(user.name);
}
```

### 리액트의 defaultProps를 사용하는 것을 피하세요. 대신 default params를 사용하세요.

2019년 이후 defaultProps는 deprecated 입니다.

```tsx
// ❌ defaultProps 사용
function Button({ label, type }) {
  return <button type={type}>{label}</button>;
}

Button.defaultProps = {
  type: "button",
  label: "버튼",
};

// ✅ default parameters 사용
function Button({ label = "버튼", type = "button" }) {
  return <button type={type}>{label}</button>;
}

// TypeScript에서의 사용
type ButtonProps = {
  label?: string;
  type?: "button" | "submit" | "reset";
};

function Button({ label = "버튼", type = "button" }: ButtonProps) {
  return <button type={type}>{label}</button>;
}
```

### event 타입을 암묵적 any 타입으로 쓰는 것을 피하세요.

```tsx
// ❌ 암묵적 any 타입 사용
const handleChange = (e) => {
  setValue(e.target.value);
};

// ✅ 명시적 타입 지정
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};

// ✅ 자주 사용되는 이벤트 타입들
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  // 클릭 이벤트 처리
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // 폼 제출 처리
};

const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  // 키보드 이벤트 처리
};
```

### 이벤트 핸들러를 useEffect 안에 넣는 것을 피하세요. 대신 이벤트 핸들러를 바로 사용하세요.

```tsx
// ❌ useEffect 안에서 이벤트 핸들러 정의
function Form() {
  useEffect(() => {
    const handleSubmit = async () => {
      await saveData();
      showNotification("저장 완료");
    };
  }, []);

  return <button onClick={handleSubmit}>저장</button>;
}

// ✅ 이벤트 핸들러를 직접 정의
function Form() {
  const handleSubmit = async () => {
    await saveData();
    showNotification("저장 완료");
  };

  return <button onClick={handleSubmit}>저장</button>;
}
```

### 이른 최적화를 피하세요. React.memo는 최후 수단으로 사용하세요. composition, relocate state 등 다양한 방법을 우선 사용해보세요.

```tsx
// ❌ 성급한 React.memo 사용
const ExpensiveList = React.memo(({ items, onItemClick }) => {
  return (
    <div>
      {items.map((item) => (
        <div key={item.id} onClick={() => onItemClick(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
});

// ✅ 상태 위치 조정으로 최적화
function ExpensiveList() {
  const [items, setItems] = useState([]);

  const handleItemClick = (id) => {
    // 로직 처리
  };

  return (
    <div>
      {items.map((item) => (
        <ListItem key={item.id} item={item} onClick={handleItemClick} />
      ))}
    </div>
  );
}

// ✅ 컴포지션으로 분리
function ListItem({ item, onClick }) {
  return <div onClick={() => onClick(item.id)}>{item.name}</div>;
}
```

### 만약 useEffect를 통한 data fetch를 해야만 하는 경우 racing condition을 피하도록 abort controller API를 사용하세요.

```tsx
// ❌ Race condition 발생 가능
function UserProfile({ userId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchUser(userId).then((user) => {
      setData(user); // 이전 요청의 응답이 나중에 도착할 수 있음
    });
  }, [userId]);
}

// ✅ AbortController로 이전 요청 취소
function UserProfile({ userId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          signal: abortController.signal,
        });
        const user = await response.json();
        setData(user);
      } catch (error) {
        if (error.name === "AbortError") {
          // 요청이 취소됨 - 무시
          return;
        }
        // 다른 에러 처리
      }
    }

    fetchData();

    return () => {
      abortController.abort(); // cleanup 시 이전 요청 취소
    };
  }, [userId]);

  if (!data) return <div>로딩 중...</div>;
  return <div>{data.name}</div>;
}
```

### isLoading(boolean)을 별도 상태로 선언해서 사용하는 것을 피하세요. 대신 데이터를 직접 바라보고 source of truth관점에서 선언해서 사용하세요.

```tsx
// ❌ 별도의 isLoading 상태 관리
function UserProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchUser()
      .then((data) => setUser(data))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div>로딩 중...</div>;
  return <div>{user?.name}</div>;
}

// ✅ 데이터 상태로부터 로딩 상태 유추
function UserProfile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser().then((data) => setUser(data));
  }, []);

  if (!user) return <div>로딩 중...</div>;
  return <div>{user.name}</div>;
}
```

## 성급한 컴포넌트 쪼개기 방지

> 성급한 추상화보다 중복이 낫다

컴포넌트를 너무 일찍 쪼개는 것은 오히려 코드의 복잡성을 증가시킬 수 있습니다. 다음과 같은 경우에만 컴포넌트를 분리하는 것이 좋습니다:

### 컴포넌트 분리가 필요한 경우

**재사용성이 명확할 때**

- 동일한 UI와 로직이 여러 곳에서 반복적으로 사용되는 경우
- 다른 프로젝트나 페이지에서도 사용될 가능성이 높은 경우

**복잡한 로직 분리가 필요할 때**

- 특정 부분의 로직이 너무 복잡해져서 관리가 어렵워질 때
- 상태 관리나 부수 효과가 독립적으로 처리되어야 할 때

**성능 최적화가 필요할 때**

- 특정 부분만 자주 리렌더링이 발생하는 경우
- React.memo()를 사용한 최적화가 효과적일 때

### 불필요한 분리를 피해야 하는 경우

**단순한 마크업 분리**

```jsx
// ❌ 불필요한 분리
const Header = () => <h1>제목</h1>;
const Content = () => <p>내용</p>;

// ✅ 하나의 컴포넌트로 유지
const Article = () => (
  <div>
    <h1>제목</h1>
    <p>내용</p>
  </div>
);
```

**한 번만 사용되는 컴포넌트**

```jsx
// ❌ 불필요한 분리
const UserProfile = () => {
  return <UserProfileDetails user={user} />;
};

// ✅ 재사용되지 않는다면 하나로 유지
const UserProfile = () => {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
    </div>
  );
};
```

**과도한 추상화**

```jsx
// ❌ 과도한 추상화
const Button = ({ color, size, children, ...props }) => {
  return (
    <button className={`btn-${color} btn-${size}`} {...props}>
      {children}
    </button>
  );
};

// ✅ 실제로 필요한 속성만 추상화
const Button = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};
```

### 컴포넌트 분리 시 고려사항

단순히 컴포넌트의 크기가 커졌다는 이유만으로 분리하는 것은 오히려 코드베이스의 복잡성을 증가시킬 수 있습니다. 다음과 같은 핵심 원칙들을 고려하여 컴포넌트 분리를 결정해야 합니다:

- **응집도**: 분리된 컴포넌트는 명확한 단일 책임을 가져야 함
- **의존성**: 부모-자식 간의 props 전달이 과도하게 복재해지지 않아야 함
- **네이밍**: 컴포넌트의 역할을 명확하게 표현하는 이름을 사용
- **크기**: 파일 크기나 로직의 복잡도가 관리하기 어려울 정도로 커졌을 때 분리 고려

## useEffect가 필요하지 않은 경우

> https://ko.react.dev/learn/you-might-not-need-an-effect

useEffect는 React의 강력한 기능이지만, 때로는 더 간단한 대안이 있을 수 있습니다. 다음은 useEffect 사용을 재고해볼 수 있는 상황들입니다.

### 렌더링을 위한 데이터 변환

```jsx
// ❌ 불필요한 useEffect 사용
const [fullName, setFullName] = useState("");
useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);

// ✅ 렌더링 중에 직접 계산
const fullName = `${firstName} ${lastName}`;
```

### Props 변경에 따른 State 업데이트

```jsx
// ❌ props로부터 state를 동기화하기 위해 useEffect 사용
useEffect(() => {
  setSearchQuery(props.defaultQuery);
}, [props.defaultQuery]);

// ✅ 가능하면 props를 직접 사용
function SearchBar({ defaultQuery }) {
  return <input defaultValue={defaultQuery} />;
}
```

### 이벤트 핸들링

```jsx
// ❌ 이벤트 핸들링에 useEffect 사용
useEffect(() => {
  if (status === 'success') {
    showNotification('데이터 저장 성공');
  }
}, [status]);

// ✅ 이벤트가 발생하는 곳에서 직접 처리
function handleSubmit() {
  await saveData();
  showNotification('데이터 저장 성공');
}
```

### 부모 컴포넌트 업데이트 트리거

```jsx
// ❌ 부모 컴포넌트 업데이트를 위해 useEffect 사용
useEffect(() => {
  onUpdate(data);
}, [data]);

// ✅ 필요한 경우에만 직접 호출
function handleChange(newData) {
  setData(newData);
  onUpdate(newData);
}
```

### 애플리케이션 초기화

```jsx
// ❌ 앱 초기화를 위해 useEffect 사용
function App() {
  useEffect(() => {
    loadDataFromLocalStorage();
  }, []);
}

// ✅ 앱 시작 시점에 직접 초기화
if (typeof window !== "undefined") {
  loadDataFromLocalStorage();
}
```

### useEffect가 실제로 필요한 경우

다음과 같은 경우에만 useEffect를 사용하세요:

**외부 시스템과의 동기화**

- WebSocket 연결 관리
- 브라우저 API 구독
- 타사 라이브러리 통합

**데이터 페칭**

- 단, React Query나 SWR 같은 데이터 페칭 라이브러리 사용을 권장

**DOM 직접 조작**

- 포커스 관리
- 스크롤 위치 제어
- 측정이 필요한 경우

### useEffect가 실제로 필요한 경우

다음과 같은 경우에만 useEffect를 사용하세요:

**외부 시스템과의 동기화**

- WebSocket 연결 관리
- 브라우저 API 구독
- 타사 라이브러리 통합

**데이터 페칭**

- 단, React Query나 SWR 같은 데이터 페칭 라이브러리 사용을 권장

**DOM 직접 조작**

- 포커스 관리
- 스크롤 위치 제어
- 측정이 필요한 경우

## 안티 패턴

React 안티패턴에 대한 내용과 모범 사례를 안내합니다.

- [`useState` 대신 변수 사용 금지](#usestate-대신-변수-사용-금지)
- [컴포넌트 외부에 CSS 선언](#컴포넌트-외부에-css-선언)
- [`useCallback`으로 함수 재생성 방지](#usecallback으로-함수-재생성-방지)
- [`useCallback`으로 의존성 변경 방지](#usecallback으로-의존성-변경-방지)
- [`useCallback`으로 `useEffect` 트리거 방지](#usecallback으로-useeffect-트리거-방지)
- [`useEffect`에 빈 의존성 배열 추가 (의존성 없을 때만)](#useeffect에-빈-의존성-배열-추가-의존성-없을-때만)
- [모든 의존성을 `useEffect`에 명시](#모든-의존성을-useeffect에-명시)
- [외부 코드 초기화에 `useEffect` 사용 금지](#외부-코드-초기화에-useeffect-사용-금지)
- [외부 함수를 `useCallback`으로 감싸지 않기](#외부-함수를-usecallback으로-감싸지-않기)
- [빈 의존성 배열과 `useMemo` 사용 금지](#빈-의존성-배열과-usememo-사용-금지)
- [컴포넌트 내부에 컴포넌트 선언 금지](#컴포넌트-내부에-컴포넌트-선언-금지)
- [조건문/return 이후 훅 사용 금지](#조건문return-이후-훅-사용-금지)
- [자식 컴포넌트가 렌더링 여부 결정하도록 허용](#자식-컴포넌트가-렌더링-여부-결정하도록-허용)
- [복수 `useState` 대신 `useReducer` 사용](#복수-usestate-대신-usereducer-사용)
- [초기 상태를 객체 대신 함수로 작성](#초기-상태를-객체-대신-함수로-작성)
- [리렌더링 방지를 위해 `useRef` 사용](#리렌더링-방지를-위해-useref-사용)

### `useState` 대신 변수 사용 금지

- **문제점**: 일반 변수는 리렌더링 시 초기화되므로 상태 변경이 UI에 반영되지 않음.
- **해결책**:
  ```jsx
  const [count, setCount] = useState(0); // ✅ 상태 보존
  ```

### 컴포넌트 외부에 CSS 선언

- **문제점**: 인라인 스타일은 매 렌더링 시 객체 재생성 → 성능 저하.
- **해결책**:

  ```jsx
  // styles.css (외부 파일)
  .button { color: red; }

  // Component.jsx
  import './styles.css'; // ✅
  ```

### `useCallback`으로 함수 재생성 방지

- **문제점**: 매 렌더링 시 새 함수 생성 → 자식 컴포넌트 불필요한 리렌더링 유발.
- **해결책**:
  ```jsx
  const handleClick = useCallback(() => {
    // 로직
  }, [deps]); // ✅ 의존성 배열 필수!
  ```

### `useCallback`으로 의존성 변경 방지

- **문제점**: 함수가 의존성 배열에 포함될 때, 재생성되지 않도록 방지하지 않으면 불필요한 리렌더링 발생.
- **해결책**:
  ```jsx
  const fetchData = useCallback(async () => {
    const res = await api.get(`/data?page=${page}`);
  }, [page]); // ✅ page 변경 시에만 함수 재생성
  ```

### `useCallback`으로 `useEffect` 트리거 방지

- **문제점**: `useEffect` 내부에서 사용되는 함수가 변경되면 `useEffect`가 재실행됨.
- **해결책**:
  ```jsx
  useEffect(() => {
    fetchData();
  }, [fetchData]); // ✅ useCallback으로 메모이제이션된 함수 사용
  ```

### `useEffect`에 빈 의존성 배열 추가 (의존성 없을 때만)

- **문제점**: 의존성 누락 시 최신 값 참조 불가 → **Stale Closure** 발생.
- **해결책**:
  ```jsx
  useEffect(() => {
    mount 시 1회 실행 // ✅
  }, []); // 정말 의존성이 없을 때만 사용
  ```

### 모든 의존성을 `useEffect`에 명시

- **문제점**: 누락된 의존성으로 인해 예상치 못한 버그 발생.
- **해결책**:
  ```jsx
  useEffect(() => {
    console.log(count);
  }, [count]); // ✅ ESLint 규칙 준수
  ```

### 외부 코드 초기화에 `useEffect` 사용 금지

- **문제점**: 외부 라이브러리 초기화가 렌더링과 결합되면 예측 불가능한 동작 발생.
- **해결책**:
  ```jsx
  // 이벤트 핸들러나 별도 모듈에서 초기화
  const initChart = () => {
    /* ... */
  };
  ```

### 외부 함수를 `useCallback`으로 감싸지 않기

- **문제점**: 이미 메모이제이션된 함수를 중복 감싸면 성능 저하.
- **해결책**:
  ```jsx
  // 부모에서 전달된 함수는 그대로 사용
  <Child onClick={props.onClick} /> // ✅
  ```

### 빈 의존성 배열과 `useMemo` 사용 금지

- **문제점**: 빈 배열 → 값이 절대 갱신되지 않아 **Stale Data** 발생.
- **해결책**:
  ```jsx
  const total = useMemo(() => price * quantity, [price, quantity]); // ✅
  ```

### 컴포넌트 내부에 컴포넌트 선언 금지

- **문제점**: 매 렌더링 시 새 컴포넌트 생성 → **State/Effect 초기화** 발생.
- **해결책**:

  ```jsx
  // 외부에 선언
  const Child = () => {
    /* ... */
  };

  const Parent = () => <Child />; // ✅
  ```

### 조건문/return 이후 훅 사용 금지

- **문제점**: 조건부 렌더링 이후 훅을 호출하면 **훅 호출 순서가 보장되지 않아 버그 발생**.
- **해결책**:
  ```jsx
  const Component = () => {
    if (condition) return null;
    useEffect(() => {}); // ❌ return 이후 훅 호출 금지
    // ✅ 훅은 항상 최상위에서 호출
    return <div />;
  };
  ```

### 자식 컴포넌트가 렌더링 여부 결정하도록 허용

- **문제점**: 부모가 강제로 리렌더링 → 성능 낭비.
- **해결책**:
  ```jsx
  const Child = React.memo(({ data }) => {
    /* ... */
  }); // ✅ Props 변화 시만 리렌더링
  ```

### 복수 `useState` 대신 `useReducer` 사용

- **문제점**: 연관된 상태를 개별로 관리하면 코드 복잡성 증가.
- **해결책**:
  ```jsx
  const [state, dispatch] = useReducer(reducer, initialState); // ✅ 복잡한 상태 통합
  ```

### 초기 상태를 객체 대신 함수로 작성

- **문제점**: 객체 초기화는 매 렌더링 시 실행 → 불필요한 계산.
- **해결책**:
  ```jsx
  const [data] = useState(() => heavyCalculation()); // ✅ 초기 1회만 실행
  ```

### 리렌더링 방지를 위해 `useRef` 사용

- **문제점**: `useState`는 값 변경 시 리렌더링을 유발.
- **해결책**:
  ```jsx
  const intervalId = useRef(null); // ✅ 리렌더링 없이 값 보존
  ```

## React 19

> https://news.hada.io/topic?id=18129

React 19에서는 다음과 같은 주요 변경사항들이 있습니다:

### React

- **Actions**: startTransition은 이제 비동기 함수를 수용할 수 있음. 이 함수들은 "Actions"라 불리며, 상태를 백그라운드에서 업데이트하고 UI를 한 번에 커밋함. Actions는 비동기 요청과 같은 부작용을 수행할 수 있으며, Transition이 완료되기 전에 작업을 기다림.
- **useActionState**: Transition 내에서 Actions를 정렬하고 상태에 접근할 수 있는 새로운 훅임. 초기 상태와 reducer를 받아들임.
- **useOptimistic**: Transition이 진행 중일 때 상태를 업데이트하는 새로운 훅임. Transition이 완료되면 상태가 새로운 값으로 업데이트됨.
- **use**: 렌더링 시 리소스를 읽을 수 있는 새로운 API임. Promise나 Context를 수용하며, Promise가 제공되면 값이 해결될 때까지 중단됨.
- **ref를 prop으로 사용**: forwardRef가 필요 없이 ref를 prop으로 사용할 수 있음.
- **Suspense 형제 프리워밍**: 컴포넌트가 중단되면 React는 가장 가까운 Suspense 경계의 대체를 즉시 커밋함.
- **새로운 JSX 변환 필수**: 번들 크기를 개선하고 React를 가져오지 않고 JSX를 사용할 수 있도록 하는 새로운 JSX 변환이 필요함.
- **렌더링 오류가 다시 던져지지 않음**: 오류가 Error Boundary에 의해 잡히지 않으면 window.reportError에 보고됨.
- **propTypes 제거**: propTypes 사용이 조용히 무시됨. TypeScript로 마이그레이션을 권장함.
- **함수의 defaultProps 제거**: ES6 기본 매개변수를 대신 사용할 수 있음.
- **문자열 refs 제거**: 문자열 refs 사용을 ref 콜백으로 마이그레이션해야 함.
- **`<Context>`를 제공자로 사용**: `<Context.Provider>` 대신 `<Context>`를 제공자로 렌더링할 수 있음.
- **커스텀 엘리먼트 지원**: React 19는 모든 커스텀 엘리먼트 테스트를 통과함.
- **StrictMode 변경 사항**: useMemo와 useCallback은 첫 번째 렌더링의 메모이제이션 결과를 재사용함.

### React DOM

- **react-dom/test-utils 제거**: act를 react-dom/test-utils에서 react로 이동함. 다른 유틸리티는 제거됨.
- **ReactDOM.render, ReactDOM.hydrate 제거**: 동시 렌더링을 위한 ReactDOM.createRoot 및 ReactDOM.hydrateRoot로 대체됨.
- **하이드레이션 오류에 대한 차이점**: 불일치가 발생할 경우, React 19는 불일치된 콘텐츠의 차이점을 포함한 단일 오류를 기록함.

### React DOM 클라이언트

- **`<form>` action prop**: Form Actions는 자동으로 폼을 관리하고 useFormStatus와 통합함. 성공 시 폼을 자동으로 재설정함.
- **문서 메타데이터 지원**: 문서 메타데이터 태그를 컴포넌트에서 네이티브로 렌더링할 수 있음.
- **스타일시트 지원**: Suspense 경계의 콘텐츠를 공개하기 전에 클라이언트의 `<head>`에 스타일시트를 삽입함.
- **비동기 스크립트 지원**: 컴포넌트 트리 어디에서나 비동기 스크립트를 렌더링할 수 있음.

### React DOM 서버

- **prerender 및 prerenderToNodeStream API 추가**: 정적 사이트 생성을 위한 API로, Node.js 스트림 및 웹 스트림과 같은 스트리밍 환경에서 작동하도록 설계됨.

### React 서버 컴포넌트

- **RSC 기능**: 지시문, 서버 컴포넌트, 서버 함수가 안정화됨. 서버 컴포넌트를 포함한 라이브러리는 이제 React 19를 피어 종속성으로 타겟팅할 수 있음.

### TypeScript 변경 사항

- **암시적 반환 금지**: refs는 이제 정리 함수만 수용함. 암시적 반환은 오류를 발생시킴.
- **useRef의 초기 인수 필요**: 초기 인수는 이제 필수임.
- **엄격한 ReactElement 타이핑**: React 요소의 props는 이제 any 대신 unknown으로 기본 설정됨.

### Deprecated

- **element.ref 접근**: element.props.ref를 선호하여 element.ref 접근을 폐기함.
- **react-test-renderer**: React 19에서는 react-test-renderer가 폐기 경고를 기록하며 웹 사용을 위해 동시 렌더링으로 전환됨.
