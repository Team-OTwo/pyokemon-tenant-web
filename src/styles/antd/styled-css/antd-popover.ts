import { css } from "styled-components"

export const cssAntdPopover = css`
  .ant-popover {
    z-index: ${({ theme }) => theme.zIndex.popover};
    .ant-popover-content {
      .ant-popover-inner {
        padding: 0;
      }
    }
  }
`
