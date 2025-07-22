import { Tabs as AntdTabs } from "antd"
import styled from "styled-components"

const StyledTabs = styled(AntdTabs)`
  &.ant-tabs {
    .ant-tabs-nav {
      &::before {
        border-bottom: none;
      }

      .ant-tabs-tab {
        font-size: 15px;
        font-weight: 400;
        line-height: 22px;

        & + .ant-tabs-tab {
          margin-left: 14px;
        }

        &:hover {
          color: ${({ theme }) => theme.colors.primary[6]};
        }

        &.ant-tabs-tab-active {
          .ant-tabs-tab-btn {
            font-weight: 500;
          }
        }
      }
    }
  }
`

interface TabsProps extends React.ComponentProps<typeof AntdTabs> {}

function Tabs({ ...props }: TabsProps) {
  return <StyledTabs {...props} />
}

export default Tabs
