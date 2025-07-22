import { Table as AntdTable } from "antd"
import clsx from "clsx"
import styled from "styled-components"

const StyledTable = styled(AntdTable)`
  --table-body-height: 610px;

  .ant-table {
    .ant-table-header {
      .ant-table-thead > tr > th {
        font-weight: 400;
        text-align: center;
      }
    }
    .ant-table-body {
      border-bottom: 1px solid ${({ theme }) => theme.colors.gray[4]};
    }

    .ant-table-tbody {
      tr td {
        &.text-center {
          text-align: center;
        }

        &.text-right {
          text-align: right;
        }

        &.text-left {
          text-align: left;
        }
      }

      .ant-table-cell {
        &.text-center {
          text-align: center;
        }

        &.text-right {
          text-align: right;
        }

        &.text-left {
          text-align: left;
        }

        .ant-empty {
          &.ant-empty-normal {
            height: calc(var(--table-body-height) - 100px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
` as typeof AntdTable

type AlignMap = {
  [key: string]: string
}
const alignMap: AlignMap = {
  center: "text-center",
  right: "text-right",
  left: "text-left",
}

type AntdTableProps = React.ComponentProps<typeof AntdTable>
type OmittedAntdTableProps = Omit<AntdTableProps, "">
interface TableProps extends OmittedAntdTableProps {}

function Table({
  size = "small",
  bordered = true,
  pagination = false,
  columns,
  rowSelection = {},
  scroll = {},
  ...props
}: TableProps) {
  const newColumns = columns?.map((col) => {
    return {
      showSorterTooltip: false,
      ...col,
      align: undefined,
      className: clsx(alignMap[col.align ?? ""], col.className),
    }
  })

  const newRowSelection = {
    columnWidth: 36,
    getCheckboxProps: () => ({
      id: Math.random().toString(36).substring(2, 15),
    }),
    ...rowSelection,
  }

  const newScroll = {
    x: "max-content",
    y: "var(--table-body-height)",
    ...scroll,
  }

  return (
    <StyledTable
      size={size}
      bordered={bordered}
      pagination={pagination}
      columns={newColumns}
      rowSelection={newRowSelection}
      scroll={newScroll}
      {...props}
    />
  )
}

export default Table as typeof AntdTable
