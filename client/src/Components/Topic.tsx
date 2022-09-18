import React, { FC } from "react"
import {Box, SxProps, useTheme} from "@mui/material"

interface IProps {
  text: string
  onClick: (topic: string) => void
}

const Topic: FC<IProps> = ({ text, onClick }) => {
  const theme = useTheme()

  const temp: SxProps = {
    padding: {
      xs: "8px 8px",
      md: "8px 15px"
    },
    margin: "2px 5px",
    backgroundColor: theme.palette.grey.A200,
    color: theme.palette.grey.A700,
    borderRadius: "7px",
    display: "inline-block",
    cursor: "pointer",
    fontSize: {
      xs: "15px",
      md: "15px"
    },
    lineHeight: {
      xs: "15px",
      md: "15px"
    }
  }

  return (
    <Box
      onClick={() => onClick(text)}
      sx={temp}
    >
      {text}
    </Box>
  )
}

export default Topic
