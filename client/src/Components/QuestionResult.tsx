import React, { FC } from "react"
import { Card, CardContent, Typography } from "@mui/material"
import DoneIcon from "@mui/icons-material/Done"
import CloseIcon from "@mui/icons-material/Close"

interface QuestionAnswerContainerProps {
  question: string
  userAnswer: string
  correctAnswer: string
}

const QuestionResult: FC<QuestionAnswerContainerProps> = ({
  question,
  userAnswer,
  correctAnswer
}) => {
  return (
    <Card raised sx={{ padding: "20px" }}>
      <CardContent sx={{ display: "flex" }}>
        {correctAnswer === userAnswer ? (
          <DoneIcon color="success" />
        ) : (
          <CloseIcon color="error" />
        )}
        <Typography sx={{ fontWeight: "bold", ml: "10px" }}>
          {question}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography>Correct Answer: {correctAnswer}</Typography>
      </CardContent>
      <CardContent>
        <Typography>Your Answer: {userAnswer}</Typography>
      </CardContent>
    </Card>
  )
}

export default QuestionResult
