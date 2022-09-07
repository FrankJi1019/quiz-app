import React, { useEffect, useState } from "react"
import Page from "../../Containers/Page"
import { useNavigate, useParams } from "react-router-dom"
import LoadingPage from "../LoadingPage"
import { IUserAnswer, IQuestion } from "../../types/IQuestion"
import {useCheckQuizResultMutation} from "../../Api/QuizAPI"
import Question from "./Question"
import { Box, Button, LinearProgress } from "@mui/material"
import { getResultPageURL } from "../../routes"
import { useUtil } from "../../Providers/UtilProvider"
import {useFetchSessionRecord} from "../../Api/SessionAPI";
import {IOption} from "../../types/IOption";
import {Record} from "../../types/Session";
import {useChangeAttemptOptionMutation} from "../../Api/AttemptAPI";

const getProgress = (userAnswer: Array<IUserAnswer>) => {
  const total = userAnswer.length
  let answered = 0
  userAnswer.forEach((answer) => (answered += answer.answerOptionId === -1 ? 0 : 1))
  return Math.round((answered / total) * 100)
}

const QuizStartPage = () => {
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const { forceRerender } = useUtil()

  const [userAnswers, setUserAnswers] = useState<Array<IUserAnswer>>([])

  const sessionRecordFetch = useFetchSessionRecord(Number(sessionId))
  const changeAttemptOptionMutation = useChangeAttemptOptionMutation()
  const checkResultMutation = useCheckQuizResultMutation()

  useEffect(() => {
    if (sessionRecordFetch.isLoading) return
    const records = sessionRecordFetch.data as Array<Record>
    setUserAnswers(
      records.map((record) => ({
        questionId: record.question.id,
        answerOptionId: record.option == undefined ? undefined : record.option.id
      }))
    )
  }, [sessionRecordFetch.isLoading])

  if (sessionRecordFetch.isLoading) return <LoadingPage />

  const sessionRecord = sessionRecordFetch.data as Array<Record>

  const questionComponents = sessionRecord.map((record, index) => (
    <Box sx={{ mb: "40px" }} key={record.question.id}>
      <Question
        questionId={record.question.id}
        questionNo={index}
        initAnswer={record.option == undefined ? undefined : record.option.id}
        onUserAnswer={(optionId) => {

          changeAttemptOptionMutation
            .mutateAsync(({questionId: record.question.id, optionId, sessionId: Number(sessionId)}))
            .then(() => sessionRecordFetch.refetch())
            .then(({data: records}) => {
              // const records = sessionRecordFetch.data as Array<Record>
              // console.log(records)
              if (records == undefined) return
              setUserAnswers(
                records.map((record) => ({
                  questionId: record.question.id,
                  answerOptionId: record.option == undefined ? undefined : record.option.id
                }))
              )
            })

          // setUserAnswers((userAnswers) => {
          //   const i = userAnswers.findIndex((u) => u.questionId === questionId)
          //   userAnswers[i] = {
          //     questionId: questionId,
          //     answerOptionId: newAnswer
          //   }
          //   return userAnswers
          // })
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
            console.log(userAnswers)
            // const result = await checkResultMutation.mutateAsync({quizId: Number(quizId), userAnswers})
            // navigate(getResultPageURL(), {
            //   state: { result }
            // })
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
