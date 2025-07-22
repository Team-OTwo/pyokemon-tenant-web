import { Pagination as AntdPagination } from "antd"
import styled from "styled-components"

const StyledPagination = styled(AntdPagination)`
  &.ant-pagination {
    &&& .ant-pagination-item,
    &&& .ant-pagination-item-link {
      border-radius: 2px;

      &:hover {
        &:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.primary[1]};
        }
      }
    }
  }
`

interface PaginationProps extends React.ComponentProps<typeof AntdPagination> {}

function Pagination({ size = "small", ...props }: PaginationProps) {
  return <StyledPagination size={size} {...props} />
}

export default Pagination
