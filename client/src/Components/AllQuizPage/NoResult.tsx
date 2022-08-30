import { Typography, Box } from "@mui/material"
import React from "react"

const NoResult = () => {
  return (
    <Box sx={{ mt: "20px", textAlign: "center" }}>
      <Typography sx={{ fontSize: "17px", color: "#777777" }}>
        No quizzes to show
      </Typography>
    </Box>
  )
}

export default NoResult
