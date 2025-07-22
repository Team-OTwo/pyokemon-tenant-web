import { css } from "styled-components"

export const cssAntdCheckbox = css`
  .ant-checkbox {
    .ant-checkbox-inner {
      border-radius: 2px;
    }
  }
  .ant-checkbox-indeterminate {
    .ant-checkbox-inner {
      background-color: ${({ theme }) => theme.colors.primary[6]} !important;
      border-color: ${({ theme }) => theme.colors.primary[6]} !important;

      &::after {
        width: 8px;
        height: 2px;
        background-color: ${({ theme }) => theme.colors.white};
      }
    }
  }

  &:hover {
    .ant-checkbox-indeterminate {
      .ant-checkbox-inner {
        background-color: ${({ theme }) => theme.colors.primary[5]} !important;
        border-color: ${({ theme }) => theme.colors.primary[5]} !important;
      }
    }
  }
`
