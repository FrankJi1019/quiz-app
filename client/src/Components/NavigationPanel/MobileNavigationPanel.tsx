import React, { FC, useState } from "react"
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useTheme
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import { NavigationPanelProps } from "./index"

const MobileNavigationPanel: FC<NavigationPanelProps> = ({ navOptions }) => {
  const theme = useTheme()

  const [openSideBar, setOpenSideBar] = useState(false)

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton onClick={() => setOpenSideBar(true)}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h1"
            sx={{
              fontSize: "30px",
              background: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            QUIZZY
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            width: "100vw"
          }
        }}
        variant="temporary"
        anchor="left"
        open={openSideBar}
        transitionDuration={400}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "60px 30px 40px"
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px"
            }}
          >
            <IconButton onClick={() => setOpenSideBar(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box>
            {navOptions.map((option, index) => (
              <Box
                key={option.text}
                onClick={() => {
                  option.onClick()
                  setOpenSideBar(false)
                }}
                sx={{
                  padding: "15px",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <Box sx={{ mr: "10px" }}>{option.icon}</Box>
                <Box sx={{ fontSize: "17px" }}>{option.text}</Box>
              </Box>
            ))}
          </Box>
          <Box>
            <Button sx={{ width: "100%", borderRadius: "10000px" }}>
              Log out
            </Button>
          </Box>
        </Box>
      </Drawer>
      <Box sx={theme.mixins.toolbar} />
    </Box>
  )
}

export default MobileNavigationPanel
