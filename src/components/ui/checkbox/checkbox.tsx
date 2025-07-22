import { Checkbox as AntdCheckbox } from "antd"
import styled from "styled-components"

const StyledCheckbox = styled(AntdCheckbox)``

interface CheckboxProps extends React.ComponentProps<typeof AntdCheckbox> {}

function Checkbox({ ...props }: CheckboxProps) {
  return <StyledCheckbox {...props} />
}

export default Checkbox
