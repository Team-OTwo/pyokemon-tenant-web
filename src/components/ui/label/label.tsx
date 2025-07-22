import styled from "styled-components"

const StyledLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
`

export interface LabelProps extends React.ComponentProps<"label"> {}

function Label({ ...props }: LabelProps) {
  return <StyledLabel {...props} />
}

export default Label
