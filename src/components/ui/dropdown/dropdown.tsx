import { Dropdown as AntdDropdown } from "antd"
import styled from "styled-components"

const StyledDropdown = styled(AntdDropdown)`
  .ant-dropdown-menu {
  }
`
interface DropdownProps extends React.ComponentProps<typeof AntdDropdown> {}

function Dropdown({ ...props }: DropdownProps) {
  return <StyledDropdown {...props} />
}

export default Dropdown
