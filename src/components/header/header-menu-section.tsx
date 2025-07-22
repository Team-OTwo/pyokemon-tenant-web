import {
  AppstoreOutlined,
  HomeOutlined,
  LineChartOutlined,
  SettingOutlined,
} from "@ant-design/icons"
import { Box } from "@mui/material"
import { NavLink } from "react-router"

import { color } from "@/styles/design-tokens"

function HeaderMenuSection() {
  const menus = [{ menuId: "1", menuName: "홈", menuPath: "/", icon: <AppstoreOutlined /> }]

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {menus.map((menu) => (
        <Box
          key={menu.menuId}
          component={NavLink}
          to={menu.menuPath}
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: "8px",
            p: "8px 16px",
            fontSize: "15px",
            lineHeight: "24px",
            fontWeight: 500,
            color: color.gray[7],
            transition: "all 0.2s ease",

            "&:hover": {
              backgroundColor: color.primary[1],
              color: color.primary[6],
            },

            "&.active": {
              backgroundColor: color.primary[1],
              color: color.primary[6],
              fontWeight: 600,
            },
          }}
        >
          <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>{menu.icon}</Box>
          {menu.menuName}
        </Box>
      ))}
    </Box>
  )
}

export default HeaderMenuSection
