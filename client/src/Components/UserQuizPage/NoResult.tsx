import { Typography, Box } from "@mui/material"
import React from "react"

const NoResult = () => {
  return (
    <Box
      sx={{
        mt: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
      }}
    >
      <Typography sx={{ fontSize: "20px", color: "#777777" }}>
        No quizzes to show
      </Typography>
    </Box>
  )
}

export default NoResult
