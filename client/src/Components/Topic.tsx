import React, { FC } from "react"
import {Box, IconButton, SxProps, useTheme} from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';

interface IProps {
  text: string
  onClick: (topic: string) => void
  onDelete?: undefined | (() => void)
}

const Topic: FC<IProps> = ({ text, onClick, onDelete }) => {
  const theme = useTheme()

  const topicBoxStyles: SxProps = {
    padding: onDelete ? {
      xs: "0px 8px",
      md: "0px 8px 0px 15px"
    } : {
      xs: "8px 8px",
      md: "8px 15px"
    },
    margin: "2px 5px",
    backgroundColor: theme.palette.grey.A200,
    color: theme.palette.grey.A700,
    borderRadius: "7px",
    display: "flex",
    alignItems: "center",
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
      sx={topicBoxStyles}
    >
      <Box>
        {text}
      </Box>
      {
        onDelete &&
          <IconButton
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            sx={{
              fontSize: "10px",
              ml: "5px"
            }}
          >
            <ClearIcon />
          </IconButton>
      }
    </Box>
  )
}

export default Topic
