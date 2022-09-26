import React, { FC } from "react"
import { Card, IconButton, Typography, useTheme } from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

interface CreatedOptionProps {
  content: string
  isCorrect: boolean
  onToggleCorrect: () => void
}

const CreatedOption: FC<CreatedOptionProps> = ({
  content,
  isCorrect,
  onToggleCorrect
}) => {
  const theme = useTheme()

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#F9F9F9",
        padding: "10px"
      }}
    >
      <IconButton onClick={onToggleCorrect}>
        <CheckCircleIcon
          sx={{color: isCorrect ? theme.palette.success.main : "auto"}}
        />
      </IconButton>
      <Typography>{content}</Typography>
    </Card>
  )
}

export default CreatedOption
