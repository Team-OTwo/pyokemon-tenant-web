import {
  ApartmentOutlined,
  ApiOutlined,
  BookOutlined,
  BranchesOutlined,
  CheckCircleOutlined,
  CodeOutlined,
  DatabaseOutlined,
  ExperimentOutlined,
  FileOutlined,
  FileTextOutlined,
  FolderOutlined,
  FormOutlined,
  LinkOutlined,
  RocketOutlined,
  SettingOutlined,
  ToolOutlined,
} from "@ant-design/icons"
import { Box } from "@mui/material"
import {
  Button,
  Card,
  Col,
  Divider,
  List,
  message,
  Progress,
  Row,
  Space,
  Statistic,
  Steps,
  Table,
  Tabs,
  Tag,
  Typography,
} from "antd"

import { color } from "@/styles/design-tokens"

// 폴더 구조 가이드
const folderStructureItems = [
  { key: "api", name: "api", description: "API 통신 관련 코드" },
  { key: "components", name: "components", description: "재사용 가능한 UI 컴포넌트" },
  { key: "constants", name: "constants", description: "상수 정의" },
  { key: "hooks", name: "hooks", description: "커스텀 훅" },
  { key: "pages", name: "pages", description: "페이지 컴포넌트" },
  { key: "stores", name: "stores", description: "상태 관리 스토어" },
  { key: "styles", name: "styles", description: "전역 스타일 정의" },
  { key: "types", name: "types", description: "전역 타입 정의" },
  { key: "utils", name: "utils", description: "유틸리티 함수" },
]

// 파일 컨벤션 가이드
const fileConventionItems = [
  { type: "components", example: "user-profile.tsx", note: "kebab-case 사용" },
  { type: "hooks", example: "use-auth.ts", note: "use- 접두사 + kebab-case" },
  { type: "utils", example: "date-formatter.ts", note: "kebab-case 사용" },
  { type: "api", example: "user-api.ts", note: "kebab-case 사용" },
  { type: "store", example: "user-store.ts", note: "kebab-case 사용" },
  { type: "pages", example: "login-page.tsx", note: "-page 접미사 + kebab-case" },
]

// 코드 스타일 가이드
const codeStyleItems = [
  {
    category: "React",
    principles: [
      "useState/useReducer는 로컬 상태에만 사용",
      "Zustand는 전역 상태 관리에 사용",
      "React Query는 서버 상태 관리에 사용",
      "useEffect 사용은 외부 시스템 동기화에만 제한",
      "비즈니스 로직은 컴포넌트에서 분리",
      "컴포넌트는 가능한 작고 단일 책임으로 유지",
    ],
  },
  {
    category: "TypeScript",
    principles: [
      "모든 컴포넌트 props에 타입 정의",
      "any 타입 사용 지양",
      "타입 단언(as)보다는 타입 가드 사용",
      "유틸리티 타입(Pick, Omit 등) 활용",
      "인터페이스 확장보다는 합성 활용",
    ],
  },
  {
    category: "React Query",
    principles: [
      "쿼리 키는 배열 형태로 명확한 계층 구조화",
      "useQuery 대신 커스텀 훅 생성하기",
      "staleTime과 cacheTime 적절히 설정",
      "관련 쿼리 무효화 고려",
      "prefetching 활용하기",
    ],
  },
  {
    category: "React Hook Form + Zod",
    principles: [
      "zod로 폼 스키마를 정의하고 유효성 검증",
      "z.infer로 TypeScript 타입 추론",
      "Controller 컴포넌트로 복잡한 입력 컴포넌트 연동",
      "에러 메시지는 한글로 작성하여 사용자 친화적으로",
      "스키마 재사용을 통한 코드 중복 방지",
    ],
  },
]

// 테스트 가이드
const testItems = [
  {
    level: "단위 테스트",
    target: "독립적인 함수, 훅, UI 컴포넌트",
    tools: "Vitest, React Testing Library",
  },
  {
    level: "통합 테스트",
    target: "컴포넌트 간 상호작용, API 통합",
    tools: "Vitest, React Testing Library",
  },
  { level: "E2E 테스트", target: "사용자 흐름, 핵심 기능", tools: "외부 도구 사용" },
]

const corePrinciples = [
  {
    title: "사용자 중심 디자인",
    description: "사용성 및 접근성을 우선시하여 매끄러운 사용자 경험 제공",
  },
  { title: "성능", description: "빠른 로드 시간과 반응성을 위한 최적화된 코드 작성" },
  {
    title: "확장성",
    description: "최소한의 노력으로 향후 성장과 변경을 지원할 수 있는 코드 구조화",
  },
  {
    title: "유지보수성",
    description: "코드베이스를 깨끗하고 모듈화하며 잘 문서화하여 기술 부채 감소",
  },
  {
    title: "문제 인지와 개선",
    description: "논리적으로 설명하기 어려운 코드를 개선하는 문화 형성",
  },
  { title: "팀 협업", description: "공통의 코딩 스타일과 코드 품질 기준을 정의하고 준수" },
]

// 기술 스택 및 문서 링크 (getting-started.md에서 최신화)
const technologies = [
  { name: "React", version: "19.0.0", description: "UI 라이브러리", docs: "https://react.dev" },
  {
    name: "React Router",
    version: "7.1.3",
    description: "라우팅 라이브러리",
    docs: "https://reactrouter.com",
  },
  {
    name: "TypeScript",
    version: "5.7.3",
    description: "정적 타입 언어",
    docs: "https://www.typescriptlang.org",
  },
  {
    name: "Ant Design",
    version: "5.24.0",
    description: "UI 컴포넌트 라이브러리",
    docs: "https://ant.design",
  },
  { name: "MUI", version: "6.4.3", description: "UI 컴포넌트 라이브러리", docs: "https://mui.com" },
  {
    name: "React Query",
    version: "5.66.0",
    description: "서버 상태 관리",
    docs: "https://tanstack.com/query/latest",
  },
  {
    name: "Zustand",
    version: "5.0.3",
    description: "클라이언트 상태 관리",
    docs: "https://zustand-demo.pmnd.rs",
  },
  {
    name: "React Hook Form",
    version: "7.54.2",
    description: "폼 상태 관리",
    docs: "https://react-hook-form.com",
  },
  { name: "Zod", version: "3.24.1", description: "스키마 유효성 검증", docs: "https://zod.dev" },
  {
    name: "Axios",
    version: "1.7.9",
    description: "HTTP 클라이언트",
    docs: "https://axios-http.com",
  },
  {
    name: "Styled Components",
    version: "6.1.14",
    description: "CSS-in-JS",
    docs: "https://styled-components.com",
  },
  { name: "Vite", version: "6.0.11", description: "빌드 도구", docs: "https://vitejs.dev" },
  {
    name: "Vitest",
    version: "3.0.3",
    description: "테스트 프레임워크",
    docs: "https://vitest.dev",
  },
]

// 개발 환경 설정 단계
const setupSteps = [
  { title: "Node.js 설치", description: "LTS 버전 권장", link: "https://nodejs.org/" },
  { title: "PNPM 설치", description: "npm install -g pnpm", link: "https://pnpm.io/" },
  { title: "의존성 설치", description: "pnpm install", link: "" },
  { title: "개발 서버 실행", description: "pnpm dev", link: "" },
]

// 개발 명령어
const devCommands = [
  {
    category: "개발",
    commands: [
      { name: "pnpm dev", description: "개발 서버 실행" },
      { name: "pnpm build", description: "프로덕션용 빌드" },
      { name: "pnpm preview", description: "빌드된 결과물 미리보기" },
    ],
  },
  {
    category: "코드 품질",
    commands: [
      { name: "pnpm lint", description: "코드 스타일 검사" },
      { name: "pnpm lint:fix", description: "코드 스타일 자동 수정" },
      { name: "pnpm format:check", description: "코드 포맷 검사" },
      { name: "pnpm format:write", description: "코드 포맷 자동 수정" },
    ],
  },
  {
    category: "테스트",
    commands: [
      { name: "pnpm test", description: "테스트 실행" },
      { name: "pnpm test:coverage", description: "테스트 커버리지 확인" },
    ],
  },
]

type TabKey = "overview" | "folder" | "file" | "code" | "test" | "setup"

function Dashboard() {
  const handleViewDocs = (url: string) => {
    if (!url) return
    window.open(url, "_blank")
    message.success("문서 페이지가 새 탭에서 열렸습니다.")
  }

  const renderOverviewTab = () => (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card title="프론트엔드 개발 핵심 원칙" bordered={false}>
          <Row gutter={[16, 16]}>
            {corePrinciples.map((principle, index) => (
              <Col xs={24} md={12} lg={8} key={index}>
                <Card size="small">
                  <Typography.Title level={5}>{principle.title}</Typography.Title>
                  <Typography.Paragraph>{principle.description}</Typography.Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Card title="기술 스택" bordered={false}>
          <Table
            dataSource={technologies}
            pagination={false}
            rowKey="name"
            columns={[
              {
                title: "기술",
                dataIndex: "name",
                key: "name",
                render: (text) => (
                  <Space>
                    <CodeOutlined />
                    <Typography.Text strong>{text}</Typography.Text>
                  </Space>
                ),
              },
              { title: "버전", dataIndex: "version", key: "version" },
              { title: "설명", dataIndex: "description", key: "description" },
              {
                title: "문서",
                dataIndex: "docs",
                key: "docs",
                render: (text) => (
                  <Button type="link" icon={<LinkOutlined />} onClick={() => handleViewDocs(text)}>
                    문서 보기
                  </Button>
                ),
              },
            ]}
          />
        </Card>
      </Col>
    </Row>
  )

  const renderSetupTab = () => (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card title="개발 환경 설정" bordered={false}>
          <Steps
            direction="vertical"
            current={-1}
            items={setupSteps.map((step, index) => ({
              title: step.title,
              description: (
                <Space direction="vertical">
                  <Typography.Text>{step.description}</Typography.Text>
                  {step.link && (
                    <Button
                      type="link"
                      icon={<LinkOutlined />}
                      onClick={() => handleViewDocs(step.link)}
                      style={{ paddingLeft: 0 }}
                    >
                      자세히 보기
                    </Button>
                  )}
                </Space>
              ),
              status: "wait",
            }))}
          />
        </Card>
      </Col>

      <Col span={24}>
        <Card title="개발 명령어" bordered={false}>
          {devCommands.map((section, index) => (
            <div key={index} style={{ marginBottom: index < devCommands.length - 1 ? 16 : 0 }}>
              <Typography.Title level={5}>{section.category}</Typography.Title>
              <Table
                dataSource={section.commands}
                pagination={false}
                rowKey="name"
                size="small"
                columns={[
                  {
                    title: "명령어",
                    dataIndex: "name",
                    key: "name",
                    render: (text) => <Typography.Text code>{text}</Typography.Text>,
                  },
                  { title: "설명", dataIndex: "description", key: "description" },
                ]}
              />
              {index < devCommands.length - 1 && <Divider style={{ margin: "16px 0" }} />}
            </div>
          ))}
        </Card>
      </Col>
    </Row>
  )

  const renderFolderTab = () => (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card title="폴더 구조 가이드" bordered={false}>
          <Typography.Paragraph>
            프로젝트의 폴더 구조는 다음과 같이 구성됩니다:
          </Typography.Paragraph>

          <div
            style={{
              background: "#f5f5f5",
              padding: "16px",
              borderRadius: "4px",
              fontFamily: "monospace",
            }}
          >
            <pre style={{ margin: 0 }}>
              {`./src
├── api         # API 통신 관련 코드
├── components  # 재사용 가능한 UI 컴포넌트
├── constants   # 상수 정의
├── hooks       # 커스텀 훅
├── pages       # 페이지 컴포넌트
├── stores      # 상태 관리 스토어
├── styles      # 전역 스타일 정의
├── types       # 전역 타입 정의
└── utils       # 유틸리티 함수`}
            </pre>
          </div>

          <Divider />

          <List
            itemLayout="horizontal"
            dataSource={folderStructureItems}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<FolderOutlined style={{ fontSize: "24px", color: color.blue[6] }} />}
                  title={<Typography.Text strong>{item.name}/</Typography.Text>}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>

      <Col span={24}>
        <Card title="페이지 폴더 구조 예시" bordered={false}>
          <Typography.Paragraph>각 페이지는 다음과 같은 구조를 가집니다:</Typography.Paragraph>

          <div
            style={{
              background: "#f5f5f5",
              padding: "16px",
              borderRadius: "4px",
              fontFamily: "monospace",
            }}
          >
            <pre style={{ margin: 0 }}>
              {`./src/pages/products/[id]/
├── product-detail-page.tsx       # 페이지 컴포넌트
├── _components/                  # 페이지 전용 컴포넌트
│   ├── product-gallery.tsx
│   └── related-products.tsx
├── _hooks/                       # 페이지 전용 훅
│   └── use-product-actions.ts
└── _constants/                   # 페이지 전용 상수
    └── product-options.ts`}
            </pre>
          </div>
        </Card>
      </Col>
    </Row>
  )

  const renderFileTab = () => (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card title="파일 네이밍 컨벤션" bordered={false}>
          <Typography.Paragraph>
            <Typography.Text strong>기본 원칙:</Typography.Text>
          </Typography.Paragraph>
          <ul>
            <li>
              모든 파일명은 <Typography.Text code>kebab-case</Typography.Text>를 사용합니다.
            </li>
            <li>파일명에는 영문 소문자와 숫자, 하이픈(-), 점(.)만 사용합니다.</li>
            <li>파일명은 해당 파일의 주요 목적이나 기능을 명확하게 표현해야 합니다.</li>
          </ul>

          <Table
            dataSource={fileConventionItems}
            pagination={false}
            columns={[
              { title: "유형", dataIndex: "type", key: "type" },
              {
                title: "예시",
                dataIndex: "example",
                key: "example",
                render: (text) => <Typography.Text code>{text}</Typography.Text>,
              },
              { title: "비고", dataIndex: "note", key: "note" },
            ]}
          />
        </Card>
      </Col>

      <Col span={24}>
        <Card title="API 폴더 구조" bordered={false}>
          <Typography.Paragraph>API 폴더 구조는 다음과 같이 구성됩니다:</Typography.Paragraph>

          <div
            style={{
              background: "#f5f5f5",
              padding: "16px",
              borderRadius: "4px",
              fontFamily: "monospace",
            }}
          >
            <pre style={{ margin: 0 }}>
              {`./src/api/users/
├── fetchers/                     # 실제 API 호출 함수
│   ├── get-user.ts
│   └── post-user.ts
├── mutations/                    # React Query Mutation 훅
│   ├── types/
│   │   └── post-user.ts
│   └── use-post-user-mutation.ts
└── queries/                      # React Query Query 훅
    ├── types/
    │   └── get-user.ts
    └── use-get-user-query.ts`}
            </pre>
          </div>
        </Card>
      </Col>
    </Row>
  )

  const renderCodeTab = () => (
    <Row gutter={[16, 16]}>
      {codeStyleItems.map((item, index) => (
        <Col span={24} key={index}>
          <Card
            title={
              <Space>
                {item.category === "React" && <CodeOutlined />}
                {item.category === "TypeScript" && <FileTextOutlined />}
                {item.category === "React Query" && <DatabaseOutlined />}
                {item.category === "React Hook Form + Zod" && <FormOutlined />}
                {item.category}
              </Space>
            }
            bordered={false}
          >
            <List
              dataSource={item.principles}
              renderItem={(principle) => (
                <List.Item>
                  <Typography.Text>
                    <CheckCircleOutlined style={{ color: color.green[6], marginRight: 8 }} />
                    {principle}
                  </Typography.Text>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      ))}

      <Col xs={24} md={12}>
        <Card
          title={
            <Space>
              <ExperimentOutlined />
              React Query 사용 예시
            </Space>
          }
          bordered={false}
        >
          <div
            style={{
              background: "#f5f5f5",
              padding: "16px",
              borderRadius: "4px",
              fontFamily: "monospace",
            }}
          >
            <pre style={{ margin: 0, overflow: "auto" }}>
              {`// src/api/auth/queries/use-get-auth-status-query.ts
import { useQuery } from "@tanstack/react-query";
import { client } from "@/api/client";

export const useGetAuthStatusQuery = () => {
  return useQuery({
    queryKey: ["api", "auth", "status"],
    queryFn: () => client.get("/api/auth/status"),
    select: (response) => response.data,
  });
};

// 컴포넌트에서 사용
function AuthStatus() {
  const { data, isLoading, error } = useGetAuthStatusQuery();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생!</div>;

  return <div>인증 상태: {data.isLoggedIn ? '로그인됨' : '로그아웃'}</div>;
}`}
            </pre>
          </div>
        </Card>
      </Col>

      <Col xs={24} md={12}>
        <Card
          title={
            <Space>
              <FormOutlined />
              React Hook Form + Zod 사용 예시
            </Space>
          }
          bordered={false}
        >
          <div
            style={{
              background: "#f5f5f5",
              padding: "16px",
              borderRadius: "4px",
              fontFamily: "monospace",
            }}
          >
            <pre style={{ margin: 0, overflow: "auto" }}>
              {`// 스키마 정의
import { z } from "zod";

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요")
    .email("올바른 이메일 형식이 아닙니다"),
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
});

// 타입 추론
type LoginFormType = z.infer<typeof loginFormSchema>;

// 폼 컴포넌트
function LoginForm() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema)
  });

  const onSubmit = (data: LoginFormType) => {
    // 폼 제출 처리
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}
      
      <input type="password" {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}
      
      <button type="submit">로그인</button>
    </form>
  );
}`}
            </pre>
          </div>
        </Card>
      </Col>
    </Row>
  )

  const renderTestTab = () => (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card title="테스트 전략" bordered={false}>
          <Typography.Paragraph>
            <Typography.Text strong>테스트 피라미드 접근 방식:</Typography.Text>
            단위 테스트를 가장 많이 작성하고, 그 다음으로 통합 테스트를 작성하며, 엔드투엔드
            테스트는 가장 적게 작성하도록 권장합니다.
          </Typography.Paragraph>

          <Table
            dataSource={testItems}
            pagination={false}
            columns={[
              { title: "레벨", dataIndex: "level", key: "level" },
              { title: "테스트 대상", dataIndex: "target", key: "target" },
              { title: "사용 도구", dataIndex: "tools", key: "tools" },
            ]}
          />
        </Card>
      </Col>

      <Col span={24}>
        <Card
          title={
            <Space>
              <ExperimentOutlined />
              테스트 코드 예시
            </Space>
          }
          bordered={false}
        >
          <Typography.Title level={5}>단위 테스트 예시</Typography.Title>
          <div
            style={{
              background: "#f5f5f5",
              padding: "16px",
              borderRadius: "4px",
              fontFamily: "monospace",
              marginBottom: 16,
            }}
          >
            <pre style={{ margin: 0, overflow: "auto" }}>
              {`import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Button from './button'

describe('Button 컴포넌트', () => {
  it('텍스트를 올바르게 렌더링해야 함', () => {
    render(<Button>테스트 버튼</Button>)
    expect(screen.getByText('테스트 버튼')).toBeInTheDocument()
  })

  it('disabled 속성이 전달되면 비활성화되어야 함', () => {
    render(<Button disabled>비활성화 버튼</Button>)
    expect(screen.getByText('비활성화 버튼')).toBeDisabled()
  })
})`}
            </pre>
          </div>

          <Typography.Title level={5}>통합 테스트 예시</Typography.Title>
          <div
            style={{
              background: "#f5f5f5",
              padding: "16px",
              borderRadius: "4px",
              fontFamily: "monospace",
            }}
          >
            <pre style={{ margin: 0, overflow: "auto" }}>
              {`import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import UserProfile from './user-profile'

// axios를 모의(mock)하기
vi.mock('axios')
const mockedAxios = axios as vi.MockedFunction<typeof axios>

describe('UserProfile 통합 테스트', () => {
  it('사용자 데이터를 로드하고 표시해야 함', async () => {
    // API 응답 모의 설정
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        id: 1,
        name: '김테스트',
        email: 'test@example.com'
      }
    })
    
    // React Query 클라이언트 설정
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
    
    // QueryClientProvider로 래핑하여 렌더링
    render(
      <QueryClientProvider client={queryClient}>
        <UserProfile userId={1} />
      </QueryClientProvider>
    )
    
    // 로딩 상태 확인
    expect(screen.getByText('로딩 중...')).toBeInTheDocument()
    
    // 데이터 로드 완료 대기
    await waitFor(() => {
      expect(screen.getByText('김테스트')).toBeInTheDocument()
    })
    
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
    expect(mockedAxios.get).toHaveBeenCalledWith('/api/users/1')
  })
})`}
            </pre>
          </div>
        </Card>
      </Col>
    </Row>
  )

  return (
    <Box sx={{ width: "100%" }}>
      <Typography.Title level={2} style={{ marginBottom: 24 }}>
        프론트엔드 개발 가이드
      </Typography.Title>

      <Tabs
        defaultActiveKey="overview"
        items={[
          {
            key: "overview",
            label: (
              <span>
                <BookOutlined />
                개요
              </span>
            ),
            children: renderOverviewTab(),
          },
          {
            key: "setup",
            label: (
              <span>
                <RocketOutlined />
                시작하기
              </span>
            ),
            children: renderSetupTab(),
          },
          {
            key: "folder",
            label: (
              <span>
                <FolderOutlined />
                폴더 구조
              </span>
            ),
            children: renderFolderTab(),
          },
          {
            key: "file",
            label: (
              <span>
                <FileOutlined />
                파일 컨벤션
              </span>
            ),
            children: renderFileTab(),
          },
          {
            key: "code",
            label: (
              <span>
                <CodeOutlined />
                코드 스타일
              </span>
            ),
            children: renderCodeTab(),
          },
          {
            key: "test",
            label: (
              <span>
                <ExperimentOutlined />
                테스트
              </span>
            ),
            children: renderTestTab(),
          },
        ]}
      />
    </Box>
  )
}

export default Dashboard
