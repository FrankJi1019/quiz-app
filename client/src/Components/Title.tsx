import React, {FC} from "react"
import {Box, Typography, useTheme} from "@mui/material";

interface PageTitleProps {
  data: string
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const Title: FC<PageTitleProps> = ({data, variant}) => {

  const theme = useTheme()

  const actualVariant = variant ? variant : "h1"

  return (
    <Box
      sx={{
        mb: "20px",
        pb: "10px",
        borderBottom: "2px solid #cccccc"
      }}
    >
      <Typography
        variant={actualVariant}
        sx={{
          color: theme.palette.primary.dark,
          fontSize: {
            xs: "25px",
            md: theme.typography[actualVariant].fontSize
          }
        }}
      >
        {data}
      </Typography>
    </Box>
  )
}

export default Title
