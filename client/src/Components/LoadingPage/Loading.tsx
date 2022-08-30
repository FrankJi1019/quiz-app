import React from "react"
import ReactLoading from "react-loading"
import { Box, useTheme } from "@mui/material"

const Loading = () => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <ReactLoading type="spinningBubbles" color={theme.palette.primary.dark} />
    </Box>
  )
}

export default Loading
