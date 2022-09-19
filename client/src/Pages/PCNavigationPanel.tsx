import React, { FC, useMemo, useState } from "react"
import {
  Box,
  Drawer,
  Menu,
  MenuItem, styled,
  Typography,
  useTheme
} from "@mui/material"
import { NavigationPanelProps } from "./NavigationPanel"
import { useAuth } from "../Providers/AuthProvider"
import ThemeSelectorModal from "../Components/ThemeSelectorModal";

export const drawerWidth = "250px"

const PCNavigationPanel: FC<NavigationPanelProps> = ({ navOptions, onLogout, onGoHome }) => {
  const theme = useTheme()
  const { getCurrentUser } = useAuth()
  const username = useMemo(
    () => getCurrentUser()!.getUsername(),
    [getCurrentUser]
  )

  const [menuAnchor, setMenuAnchor] = useState(null)
  const [showThemeSelector, setShowThemeSelector] = useState(false)

  const NavOption = useMemo(() => styled(Box)({
    cursor: "pointer",
    width: "100%",
    padding: "10px 20px",
    boxSizing: "border-box",
    transition: 'all .18s',
    "&:hover": {
      backgroundColor: theme.palette.primary.main + "55",
      borderLeft: "5px solid " + theme.palette.primary.dark,
      color: theme.palette.primary.dark,
      fontWeight: "bold"
    }
  }), [theme])

  const HighlightedNavOption = useMemo(() => styled(Box)({
    cursor: "pointer",
    width: "100%",
    padding: "10px 20px",
    boxSizing: "border-box",
    transition: 'all .18s',
    backgroundColor: theme.palette.primary.main + "55",
    borderLeft: "5px solid " + theme.palette.primary.dark,
    color: theme.palette.primary.dark,
    fontWeight: "bold"
  }), [theme])

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
                onClick={onGoHome}
                sx={{
                  padding: "20px 0",
                  fontSize: "40px",
                  fontWeight: "bolder",
                  cursor: "pointer",
                  textAlign: "center",
                  color: theme.palette.primary.dark,
                }}
              >
                {" " + "QUIZZY" + " "}
              </Typography>
            </Box>
            <Box>
              {
                navOptions.map((option) => (
                  option.shouldHighlight() ?
                    <HighlightedNavOption
                      key={option.text}
                      onClick={option.onClick}
                    >
                      {option.text}
                    </HighlightedNavOption> :
                    <NavOption
                      key={option.text}
                      onClick={option.onClick}
                    >
                      {option.text}
                    </NavOption>
                ))
              }
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
              <MenuItem onClick={onLogout}>
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
