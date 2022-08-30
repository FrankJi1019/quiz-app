import React, { useEffect, useState } from "react"
import Page from "../../Containers/Page"
import { useNavigate, useParams } from "react-router-dom"
import LoadingPage from "../LoadingPage"
import { IUserAnswer, IQuestion } from "../../../types/IQuestion"
import { getQuestionsByQuizId, getQuizResult } from "../../Api/QuizAPI"
import Question from "./Question"
import { Box, Button, LinearProgress } from "@mui/material"
import { getResultPageURL } from "../../routes"
import { useUtil } from "../../Providers/UtilProvider"

const getProgress = (userAnswer: Array<IUserAnswer>) => {
  const total = userAnswer.length
  let answered = 0
  userAnswer.forEach((answer) => (answered += answer.answerOptionId === -1 ? 0 : 1))
  return Math.round((answered / total) * 100)
}

const QuizStartPage = () => {
  const { quizId } = useParams()
  const navigate = useNavigate()
  const { forceRerender } = useUtil()

  const [questions, setQuestions] = useState<Array<IQuestion> | null>(null)
  const [userAnswers, setUserAnswers] = useState<Array<IUserAnswer>>([])

  if (!quizId || isNaN(Number(quizId))) return null

  useEffect(() => {
    getQuestionsByQuizId(Number(quizId)).then((res) => {
      setQuestions(res.data)
      setUserAnswers(
        res.data.map((question: { id: any }) => ({
          questionId: question.id,
          answerOptionId: -1
        }))
      )
    })
  }, [quizId])

  if (!questions) return <LoadingPage />

  const questionComponents = questions.map((question, index) => (
    <Box sx={{ mb: "40px" }} key={question.id}>
      <Question
        questionId={question.id}
        questionNo={index}
        onUserAnswer={(newAnswer) => {
          setUserAnswers((userAnswers) => {
            const i = userAnswers.findIndex((u) => u.questionId === question.id)
            userAnswers[i] = {
              questionId: question.id,
              answerOptionId: newAnswer
            }
            return userAnswers
          })
          forceRerender()
        }}
      />
    </Box>
  ))

  return (
    <Page sx={{ padding: { xs: "20px", md: "50px 80px" } }}>
      <Box
        sx={{
          position: "fixed",
          top: {
            xs: "auto",
            md: "0px"
          },
          bottom: {
            xs: "0px",
            md: "auto"
          },
          left: "0px",
          right: "0px",
          zIndex: "1300"
        }}
      >
        <LinearProgress
          color="secondary"
          variant="determinate"
          value={getProgress(userAnswers)}
          sx={{ height: "15px" }}
        />
      </Box>
      <Box>{questionComponents}</Box>
      <Box>
        <Button
          variant="contained"
          onClick={async () => {
            const result = await getQuizResult(Number(quizId), userAnswers)
            navigate(getResultPageURL(), {
              state: { result: result.data }
            })
          }}
          disabled={getProgress(userAnswers) < 100}
        >
          Submit
        </Button>
      </Box>
    </Page>
  )
}

export default QuizStartPage
