import React, {FC} from "react"
import {Box, Typography, useTheme} from "@mui/material";

interface PageTitleProps {
  data: string
}

const PageTitle: FC<PageTitleProps> = ({data}) => {

  const theme = useTheme()

  return (
    <Box
      sx={{
        mb: "20px",
        pb: "10px",
        borderBottom: "2px solid #cccccc"
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: theme.palette.primary.dark,
          fontSize: {
            xs: "25px",
            md: theme.typography.h1.fontSize
          }
        }}
      >
        {data}
      </Typography>
    </Box>
  )
}

export default PageTitle
