import { ThemeProvider as MuiThemeProvider } from "@mui/material"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ConfigProvider } from "antd"
import { ThemeProvider as StyledThemeProvider } from "styled-components"

import antdTheme from "@/styles/antd/antd-theme"
import GlobalStyles from "@/styles/global-styles"
import muiTheme from "@/styles/mui/mui-theme"
import styledComponentsTheme from "@/styles/styled-components/styled-components-theme"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider theme={antdTheme}>
      <MuiThemeProvider theme={muiTheme}>
        <StyledThemeProvider theme={styledComponentsTheme}>
          <GlobalStyles />
          <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </StyledThemeProvider>
      </MuiThemeProvider>
    </ConfigProvider>
  )
}

export default Providers
