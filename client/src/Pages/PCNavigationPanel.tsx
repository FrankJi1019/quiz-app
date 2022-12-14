import React, {FC, useMemo} from "react"
import {
  Box,
  Drawer,
  styled,
  Typography,
  useTheme
} from "@mui/material"
import {NavigationPanelProps} from "./NavigationPanel"
import {useSelector} from "react-redux";

export const drawerWidth = "250px"

const PCNavigationPanel: FC<NavigationPanelProps> = ({navOptions, onGoHome}) => {
  const theme = useTheme()
  const showSidebar = useSelector(state => (state as {showSidebar: boolean}).showSidebar)

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
    <Box sx={{width: showSidebar ? drawerWidth : 0}}>
      <Drawer anchor="left" variant="persistent" open={showSidebar}>
        <Box
          sx={{
            width: drawerWidth,
            backgroundColor: theme.palette.primary.light,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start"
          }}
        >
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
                textShadow: "5px 5px rgba(0,0,0,.25)"
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
      </Drawer>
    </Box>
  )
}

export default PCNavigationPanel
