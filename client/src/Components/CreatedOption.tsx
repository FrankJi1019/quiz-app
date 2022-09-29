import React, { FC } from "react"
import {Box, Card, IconButton, Typography, useTheme} from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CloseIcon from '@mui/icons-material/Close';

interface CreatedOptionProps {
  content: string
  isCorrect: boolean
  onToggleCorrect: () => void
  onDelete: () => void
}

const CreatedOption: FC<CreatedOptionProps> = ({
  content,
  isCorrect,
  onToggleCorrect,
  onDelete
}) => {
  const theme = useTheme()

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#F9F9F9",
        padding: "10px",
        justifyContent: "space-between"
      }}
    >
      <Box sx={{display: "flex", alignItems: "center"}}>
        <IconButton onClick={onToggleCorrect}>
          <CheckCircleIcon
            sx={{color: isCorrect ? theme.palette.success.main : "auto"}}
          />
        </IconButton>
        <Typography>{content}</Typography>
      </Box>
      <Box>
        <IconButton onClick={onDelete}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Card>
  )
}

export default CreatedOption
