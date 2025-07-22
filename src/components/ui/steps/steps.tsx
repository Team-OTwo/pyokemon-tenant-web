import { Steps as AntdSteps } from "antd"
import styled from "styled-components"

const StyledSteps = styled(AntdSteps)`
  .ant-steps-item-title {
    font-size: 15px;
  }
`

interface StepsProps extends React.ComponentProps<typeof AntdSteps> {}

function Steps({ ...props }: StepsProps) {
  return <StyledSteps {...props} />
}

export default Steps
