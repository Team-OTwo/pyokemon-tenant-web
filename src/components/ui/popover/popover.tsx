import { Popover as AntdPopover } from "antd"
import styled from "styled-components"

const StyledPopover = styled(AntdPopover)``

interface PopoverProps extends React.ComponentProps<typeof AntdPopover> {}

function Popover({ ...props }: PopoverProps) {
  return <StyledPopover {...props} />
}

export default Popover
