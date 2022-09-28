import React, {useMemo} from "react"
import Page from "../Containers/Page"
import {useNavigate, useParams} from "react-router-dom"
import { Box, Typography } from "@mui/material"
import {useFetchSessionResult} from "../Api/SessionAPI";
import LoadingPage from "./LoadingPage";
import {Result} from "../types/Session";
import QuestionResultList from "../Components/QuestionResultList";
import {getQuestionResultPageURL} from "../routes";

const FinishedSessionPage = () => {
  const {sessionId} = useParams()
  const navigate = useNavigate()

  const sessionResultFetch = useFetchSessionResult(Number(sessionId))

  const mark = useMemo(() => {
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
        <QuestionResultList
          results={result}
          onViewDetail={(question) => navigate(getQuestionResultPageURL(Number(sessionId), question.id))}
        />
      </Box>
    </Page>
  )
}

export default FinishedSessionPage
