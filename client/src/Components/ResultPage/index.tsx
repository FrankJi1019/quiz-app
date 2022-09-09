import React, {useEffect, useMemo, useState} from "react"
import Page from "../../Containers/Page"
import {useLocation, useParams} from "react-router-dom"
import { Box, Typography } from "@mui/material"
import QuestionResult from "./QuestionResult"
import {useFetchSessionResult} from "../../Api/SessionAPI";
import LoadingPage from "../LoadingPage";
import {Result} from "../../types/Session";

const ResultPage = () => {
  const {sessionId} = useParams()

  const sessionResultFetch = useFetchSessionResult(Number(sessionId))

  const mark = useMemo(() => {
    console.log(sessionResultFetch.data)
    if (sessionResultFetch.isLoading) return ""
    const results = sessionResultFetch.data as Array<Result>
    let correct = 0
    results.forEach(r => correct += r.isCorrect ? 1 : 0)
    return Math.round((correct / results.length) * 100)
  }, [sessionResultFetch.isLoading])

  if (sessionResultFetch.isLoading) return <LoadingPage />

  const result = sessionResultFetch.data as Array<Result>

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
