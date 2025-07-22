import { Button } from "@mui/material"
import { FallbackProps } from "react-error-boundary"
import { Link } from "react-router"
import styled from "styled-components"

const Box = styled.div`
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100vh;
`

const ErrorTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary[5]};
`

const ErrorMessage = styled.p`
  font-size: 16px;
  font-weight: 400;
`

const ButtonBox = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 10px;
`

function RootError({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Box>
      <ErrorTitle>Error</ErrorTitle>
      <ErrorMessage>{error.message}</ErrorMessage>
      <ButtonBox>
        <Button onClick={resetErrorBoundary} variant="secondary">
          Try again
        </Button>
        <Button component={Link} to="/" variant="link">
          Go to home
        </Button>
      </ButtonBox>
    </Box>
  )
}

export default RootError
