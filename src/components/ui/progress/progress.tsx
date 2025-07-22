import { Progress as AntdProgress } from "antd"
import styled from "styled-components"

const StyledProgress = styled(AntdProgress)`
  &.ant-progress {
    &.ant-progress-status-normal .ant-progress-bg {
      background-color: ${({ theme }) => theme.colors.primary[6]};
    }

    &.ant-progress-status-active .ant-progress-bg {
      background-color: ${({ theme }) => theme.colors.blue[6]};
    }

    &.ant-progress-status-exception .ant-progress-bg {
      background-color: ${({ theme }) => theme.colors.red[6]};
    }

    &.ant-progress-status-success .ant-progress-bg {
      background-color: ${({ theme }) => theme.colors.green[6]};
    }
  }
`

interface ProgressProps extends React.ComponentProps<typeof AntdProgress> {}

function Progress({ ...props }: ProgressProps) {
  return <StyledProgress {...props} />
}

export default Progress
