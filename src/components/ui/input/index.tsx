import { Input as AntdInput } from "antd"
import styled from "styled-components"

const StyledInput = styled(AntdInput)``

interface InputProps extends React.ComponentProps<typeof StyledInput> {}

function Input({ ...props }: InputProps) {
  return <StyledInput {...props} />
}

Input.Search = StyledInput.Search

export default Input
