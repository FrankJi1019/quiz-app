import React, { FC } from "react"
import {Box, Button, Card, CardContent, Typography} from "@mui/material"
import DoneIcon from "@mui/icons-material/Done"
import CloseIcon from "@mui/icons-material/Close"
import {IQuestion} from "../types/IQuestion";
import {useNavigate, useParams} from "react-router-dom";
import {getQuestionResultPageURL} from "../routes";

interface QuestionAnswerContainerProps {
  question: IQuestion
  userAnswer: string
  correctAnswer: string
  isCorrect: boolean
}

const QuestionResult: FC<QuestionAnswerContainerProps> = ({
  question,
  userAnswer,
  correctAnswer,
  isCorrect
}) => {

  const navigate = useNavigate()
  const {sessionId} = useParams()

  return (
    <Card
      raised
      sx={{
        padding: "20px 30px",
        borderRadius: "10px"
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: "10px"
        }}
      >
        <Box sx={{display: "flex", alignItems: "center"}}>
          {isCorrect ? (
            <DoneIcon color="success" sx={{fontSize: "30px"}} />
          ) : (
            <CloseIcon color="error" sx={{fontSize: "30px"}} />
          )}
          <Typography variant="h6" sx={{ ml: "10px" }}>
            {question.content}
          </Typography>
        </Box>
        <Box>
          <Button
            variant="outlined"
            onClick={() => navigate(getQuestionResultPageURL(sessionId, question.id))}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
      <CardContent sx={{mb: "10px"}}>
        <Typography>Correct Answer: {correctAnswer}</Typography>
        {
          !isCorrect && <Typography>Your Answer: {userAnswer}</Typography>
        }
      </CardContent>
    </Card>
  )
}

export default QuestionResult
