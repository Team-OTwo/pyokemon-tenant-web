import { Typography } from "@mui/material"
import styled, { css } from "styled-components"

interface StyledHelperTextProps {
  $isError?: boolean
}

const StyledHelperText = styled(Typography)<StyledHelperTextProps>`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray[8]};
  ${({ theme, $isError }) => {
    if ($isError) {
      return css`
        color: ${theme.colors.danger};
      `
    }
  }}
`

export interface HelperTextProps extends React.ComponentProps<"p"> {
  isError?: boolean
}

function HelperText({ isError = false, ...props }: HelperTextProps) {
  return <StyledHelperText variant="body" $isError={isError} {...props} />
}

export default HelperText
