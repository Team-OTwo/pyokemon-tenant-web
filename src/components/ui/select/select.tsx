import { Select as AntdSelect } from "antd"
import styled from "styled-components"

const StyledSelect = styled(AntdSelect)`
  &.ant-select {
    font-size: 16px;
    line-height: 24px;
    height: 50px;
    color: ${({ theme }) => theme.colors.gray[11]};

    .ant-select-selector {
      border-radius: 12px;
      width: 320px;
      height: 50px;
      display: flex;
      align-items: center;
      font-color: #a19f9a;
      font-size: 16px;
      padding-left: 16px;
      font-family: Pretendard;
    }

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
