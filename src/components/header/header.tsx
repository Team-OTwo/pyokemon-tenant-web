import { GithubOutlined, RocketOutlined } from "@ant-design/icons"
import { Box, Typography } from "@mui/material"
import { Button } from "antd"
import { Link } from "react-router"

import { color, zIndex } from "@/styles/design-tokens"

import HeaderMenuSection from "./header-menu-section"

function Header() {
  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: zIndex.header,
        borderBottom: `1px solid ${color.gray[2]}`,
        bgcolor: color.white,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
      }}
    >
      <Box
        sx={{
          width: "var(--container-width)",
          mx: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 var(--header-spacing-left) 0 var(--header-spacing-right)",
          height: "var(--header-height)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: color.primary[6],
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: "50%",
                mr: 1.5,
                background: `linear-gradient(135deg, ${color.primary[4]}, ${color.primary[6]})`,
                color: "white",
                boxShadow: `0 4px 12px ${color.primary[3]}40`,
              }}
            >
              <RocketOutlined style={{ fontSize: 24 }} />
            </Box>
            <Typography
              variant="h4Bold"
              sx={{
                background: `linear-gradient(135deg, ${color.primary[6]}, ${color.primary[4]})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 700,
                letterSpacing: "-0.5px",
              }}
            >
              Pyokemon
            </Typography>
          </Box>
        </Box>

        <HeaderMenuSection />

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            type="default"
            icon={<GithubOutlined />}
            href="https://github.com"
            target="_blank"
            style={{
              display: "flex",
              alignItems: "center",
              borderColor: color.gray[4],
              color: color.gray[7],
            }}
          >
            GitHub
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Header
