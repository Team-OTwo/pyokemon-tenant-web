import { css } from "styled-components"

export const cssAntdSelect = css`
  .ant-select-dropdown {
    padding: 4px 0;

    .ant-select-item {
      border-radius: 0;

      &.ant-select-item-option-active {
        background-color: ${({ theme }) => theme.colors.primary[1]};
      }
    }
  }
`
