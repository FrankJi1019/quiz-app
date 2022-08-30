import React, { useEffect, useState } from "react"
import Page from "../../Containers/Page"
import { useLocation } from "react-router-dom"
import { Box, Typography } from "@mui/material"
import QuestionResult from "./QuestionResult"

const ResultPage = () => {
  const { state } = useLocation()

  const [mark, setMark] = useState(-1)

  if (!state) return null

  const result = (
    state as {
      result: Array<{
        questionId: number
        questionContent: string
        userAnswer: string
        correctAnswer: string
      }>
    }
  ).result

  useEffect(() => {
    if (result === null) return
    const total = result.length
    let correct = 0
    result.forEach((r) => (correct += r.correctAnswer === r.userAnswer ? 1 : 0))
    setMark(Math.round((correct / total) * 100))
  }, [state])

  return (
    <Page sx={{ padding: { xs: "20px", md: "50px" } }}>
      <Box sx={{ mb: "30px" }}>
        <Typography variant="h3">{"Your result is: " + mark}</Typography>
      </Box>
      <Box>
        {result.map((r) => (
          <Box key={r.questionId} sx={{ mb: "20px" }}>
            <QuestionResult
              question={r.questionContent}
              userAnswer={r.userAnswer}
              correctAnswer={r.correctAnswer}
            />
          </Box>
        ))}
      </Box>
    </Page>
  )
}

export default ResultPage
