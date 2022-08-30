import React, { FC } from "react"
import { Box, Card, IconButton, useTheme } from "@mui/material"
import { IQuestion } from "../../../types/IQuestion"
import DeleteIcon from "@mui/icons-material/Delete"
import { deleteQuestion } from "../../Api/QuestionAPI"
import { useUtil } from "../../Providers/UtilProvider"

interface QuestionProps {
  question: IQuestion
}

const Question: FC<QuestionProps> = ({ question }) => {
  const theme = useTheme()
  const { forceRerender } = useUtil()

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        cursor: "pointer",
        backgroundColor: "#F5F5F5",
        transition: ".2s",
        "&:hover": {
          transform: "translateY(-3px)",
          backgroundColor: theme.palette.primary.light
        }
      }}
    >
      <Box>{question.content}</Box>
      <Box>
        <IconButton
          onClick={async (e) => {
            e.stopPropagation()
            await deleteQuestion(question.id)
            forceRerender()
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  )
}

export default Question
