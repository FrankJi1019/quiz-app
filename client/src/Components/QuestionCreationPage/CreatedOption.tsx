import React, { FC } from "react"
import { Box, IconButton, Typography, useTheme } from "@mui/material"
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
    <Box
      sx={{
        display: "flex",
        alignItems: "center"
      }}
    >
      <IconButton onClick={onToggleCorrect}>
        <CheckCircleIcon
          sx={{
            color: isCorrect ? theme.palette.success.main : "auto"
          }}
        />
      </IconButton>
      <Typography>{content}</Typography>
    </Box>
  )
}

export default CreatedOption
