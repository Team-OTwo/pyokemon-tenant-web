import { Select as AntdSelect } from "antd"
import styled from "styled-components"

const StyledSelect = styled(AntdSelect)`
  &.ant-select {
    font-size: 16px;
    line-height: 24px;
    color: ${({ theme }) => theme.colors.gray[11]};

    &&&.ant-select-disabled {
      .ant-select-selector {
        background-color: ${({ theme }) => theme.colors.gray[3]};
        color: inherit;
      }
    }
  }
`

interface SelectProps extends React.ComponentProps<typeof AntdSelect> {}

function Select({ ...props }: SelectProps) {
  return <StyledSelect {...props} />
}

export default Select as typeof AntdSelect
