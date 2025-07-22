import { Tag as AntdTag } from "antd"
import styled, { css } from "styled-components"

type TagColor =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "processing"
  | "gray"
  | "magenta"
  | "green"
  | "red"
  | "volcano"
  | "orange"
  | "gold"
  | "lime"
  | "cyan"
  | "blue"
  | "geekblue"
  | "purple"
const StyledTag = styled(AntdTag)<{ $color: TagColor }>`
  &.ant-tag {
    font-size: 13px;
    line-height: 22px;
    margin: 0;

    ${({ $color, theme }) => {
      if ($color === "gray") {
        return css`
          color: ${theme.colors.gray[10]};
          background-color: ${theme.colors.gray[3]};
          border-color: ${theme.colors.gray[9]};
        `
      }

      if ($color === "success") {
        return css`
          color: #389e0d;
          background-color: #f6ffed;
          border-color: #b7eb8f;
        `
      }

      if ($color === "warning") {
        return css`
          color: #fa8c16;
          background-color: #fff7e6;
          border-color: #ffd591;
        `
      }

      if ($color === "error") {
        return css`
          color: #f5222d;
          background-color: #fff1f0;
          border-color: #ffa39e;
        `
      }

      if ($color === "processing") {
        return css`
          color: #096dd9;
          background-color: #e6f7ff;
          border-color: #91d5ff;
        `
      }
    }}

    .ant-tag-close-icon {
      vertical-align: 0;
    }
  }
`

interface TagProps extends React.ComponentProps<typeof AntdTag> {
  color?: TagColor
}

function Tag({ color = "default", ...props }: TagProps) {
  return <StyledTag $color={color} color={color === "gray" ? undefined : color} {...props} />
}

const StyledTagCheckable = styled(AntdTag.CheckableTag)`
  &.ant-tag-checkable {
    font-size: 13px;
    line-height: 22px;
    margin: 0;
  }
`

interface TagCheckableProps extends React.ComponentProps<typeof StyledTagCheckable> {}

function TagCheckable({ ...props }: TagCheckableProps) {
  return <StyledTagCheckable {...props} />
}

Tag.Checkable = TagCheckable

export default Tag
