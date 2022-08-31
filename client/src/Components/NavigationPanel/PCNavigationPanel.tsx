import React, { FC, useMemo, useState } from "react"
import {
  Box,
  Drawer,
  Menu,
  MenuItem,
  Typography,
  useTheme
} from "@mui/material"
import { getHomePageURL } from "../../routes"
import { useNavigate } from "react-router-dom"
import { NavigationPanelProps } from "./index"
import { useAuth } from "../../Providers/AuthProvider"
import ThemeSelectorModal from "../ThemeSelectorModal";
import {useDispatch} from "react-redux";
import {resetTheme} from "../../Slices/themeSlice";

export const drawerWidth = "250px"

const PCNavigationPanel: FC<NavigationPanelProps> = ({ navOptions }) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { getCurrentUser, logout } = useAuth()
  const username = useMemo(
    () => getCurrentUser()!.getUsername(),
    [getCurrentUser]
  )

  const [menuAnchor, setMenuAnchor] = useState(null)
  const [showThemeSelector, setShowThemeSelector] = useState(false)
  const dispatch = useDispatch()

  return (
    <Box sx={{ width: drawerWidth }}>
      <Drawer anchor="left" variant="persistent" open container={undefined}>
        <Box
          sx={{
            width: drawerWidth,
            backgroundColor: theme.palette.primary.light,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <Box>
            <Box>
              <Typography
                onClick={() => navigate(getHomePageURL())}
                sx={{
                  padding: "20px 0",
                  fontSize: "40px",
                  fontWeight: "bolder",
                  cursor: "pointer",
                  textAlign: "center",
                  color: theme.palette.secondary.dark,
                }}
              >
                {" " + "QUIZZY" + " "}
              </Typography>
            </Box>
            <Box>
              {navOptions.map((option) => (
                <Box
                  key={option.text}
                  onClick={option.onClick}
                  sx={{
                    cursor: "pointer",
                    width: "100%",
                    padding: "10px 20px",
                    boxSizing: "border-box",
                    "&:hover": {
                      backgroundColor: theme.palette.secondary.light
                    }
                  }}
                >
                  {option.text}
                </Box>
              ))}
            </Box>
          </Box>
          <Box
            onMouseEnter={(e) => setMenuAnchor(e.currentTarget as any)}
            onMouseLeave={() => setMenuAnchor(null)}
            sx={{
              backgroundColor: "#FFFFFF",
              width: "50px",
              height: "50px",
              borderRadius: "1000px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "20px",
              fontWeight: "bold",
              cursor: "pointer",
              margin: "20px"
            }}
          >
            {username.toUpperCase()[0]}
            <Menu
              autoFocus={false}
              open={Boolean(menuAnchor)}
              anchorEl={menuAnchor}
              onClose={() => setMenuAnchor(null)}
              MenuListProps={{
                onMouseLeave: () => setMenuAnchor(null)
              }}
              sx={{ transform: "translateY(-50px)" }}
            >
              <MenuItem onClick={() => setShowThemeSelector(true)}>Change Theme</MenuItem>
              <MenuItem
                onClick={() => {
                  logout()
                  dispatch(resetTheme())
                }}
              >
                Log Out
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Drawer>
      <ThemeSelectorModal open={showThemeSelector} onClose={() => setShowThemeSelector(false)} />
    </Box>
  )
}

export default PCNavigationPanel
