import React, { FC } from "react"
import { Box, Card, IconButton, useTheme } from "@mui/material"
import { IQuestion } from "../types/IQuestion"
import DeleteIcon from "@mui/icons-material/Delete"
import {useDeleteQuestionMutation} from "../Api/QuestionAPI"
import {useParams} from "react-router-dom";
import {useFetchQuestionsByQuizId} from "../Api/QuizAPI";

interface QuestionProps {
  question: IQuestion
  onClick: (question: IQuestion) => void
}

const QuestionOverview: FC<QuestionProps> = ({ question , onClick}) => {
  const theme = useTheme()
  const { quizId } = useParams()

  const questionsFetch = useFetchQuestionsByQuizId(Number(quizId))
  const deleteQuestionMutation = useDeleteQuestionMutation()

  return (
    <Card
      onClick={() => onClick(question)}
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
            await deleteQuestionMutation.mutateAsync(question.id)
            questionsFetch.refetch()
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  )
}

export default QuestionOverview
