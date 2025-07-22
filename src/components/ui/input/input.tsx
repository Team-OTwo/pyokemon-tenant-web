import styled, { css } from "styled-components"

type Size = "small" | "medium" | "large"
interface StyledInputProps {
  $size: Size
}
const StyledInput = styled.input<StyledInputProps>`
  outline: none;

  width: 100%;

  display: flex;
  background-color: transparent;

  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.gray[8]};
  font-size: 15px;
  line-height: 22px;

  &::placeholder {
    opacity: 1;
    color: ${({ theme }) => theme.colors.gray[6]};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary[6]};
  }

  &:focus,
  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.primary[5]};
    box-shadow: 0px 0px 0px 2px #6338ce33;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[3]};
    border-color: ${({ theme }) => theme.colors.gray[5]};
    color: ${({ theme }) => theme.colors.gray[6]};
  }

  ${({ $size }) => sizeStyles($size)}
`

const sizeStyles = (size: Size) => {
  if (size === "large") {
    return css`
      height: 40px;
      padding: 9px 12px;
    `
  }

  if (size === "medium") {
    return css`
      height: 32px;
      padding: 5px 12px;
    `
  }

  if (size === "small") {
    return css`
      height: 24px;
      padding: 1px 8px;
    `
  }
}

export interface InputProps extends Omit<React.ComponentProps<"input">, "size"> {
  size?: Size
}

function Input({ size = "medium", ...props }: InputProps) {
  return <StyledInput $size={size} {...props} />
}

export default Input
