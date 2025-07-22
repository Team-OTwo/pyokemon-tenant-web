import { Badge as AntdBadge } from "antd"
import styled from "styled-components"

type BadgeColor = "red" | "green" | "gray" | "primary invert" | "primary"

interface StyledBadgeProps {
  $color?: BadgeColor
}

const StyledBadge = styled(AntdBadge)<StyledBadgeProps>`
  &.ant-badge {
    .ant-badge-count {
      font-size: 13px;
      line-height: 22px;
      height: 22px;
      border-radius: 100px;
      padding-left: 7px;
      padding-right: 7px;

      &.ant-badge-count-sm {
        font-size: 12px;
        line-height: 16px;
        height: 16px;
        border-radius: 100px;
        padding-left: 5px;
        padding-right: 5px;
      }

      ${({ $color, theme }) => {
        if ($color === "primary invert") {
          return `
            background-color: ${theme.colors.primary[1]};
            color: ${theme.colors.primary[6]};
          `
        }

        if ($color === "primary") {
          return `
            background-color: ${theme.colors.primary[6]};
            color: ${theme.colors.white};
          `
        }

        if ($color === "green") {
          return `
            background-color: ${theme.colors.green[6]};
            color: ${theme.colors.white};
          `
        }

        if ($color === "gray") {
          return `
            background-color: ${theme.colors.gray[4]};
            color: ${theme.colors.gray[9]};
          `
        }

        if ($color === "red") {
          return `
            background-color: ${theme.colors.red[5]};
            color: ${theme.colors.white};
          `
        }
      }}
    }
  }
`

interface BadgeProps extends React.ComponentProps<typeof AntdBadge> {
  color?: BadgeColor
}

function Badge({ color = "gray", ...props }: BadgeProps) {
  return <StyledBadge $color={color} {...props} />
}

Badge.Ribbon = StyledBadge.Ribbon

export default Badge
