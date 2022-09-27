import React, {useEffect, useState} from "react"
import Page from "../Containers/Page"
import {useNavigate, useParams} from "react-router-dom"
import LoadingPage from "./LoadingPage"
import {IUserAnswer} from "../types/IQuestion"
import QuestionForm from "../Components/QuestionForm"
import {Box, Button, Fade, IconButton, Slide, Typography} from "@mui/material"
import {getFinishedSessionPageURL} from "../routes"
import {useUtil} from "../Providers/UtilProvider"
import {useFetchSession, useFetchSessionRecord} from "../Api/SessionAPI";
import {ISession, Record, SessionState} from "../types/Session";
import {useChangeAttemptOptionMutation} from "../Api/AttemptAPI";
import {useDispatch} from "react-redux";
import {hideSidebar, showSidebar} from "../Slices/showSidebarSlice";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const getProgress = (userAnswer: Array<IUserAnswer>) => {
  const total = userAnswer.length
  let answered = 0
  userAnswer.forEach((answer) => (answered += answer.answerOptionId === -1 ? 0 : 1))
  return Math.round((answered / total) * 100)
}

const ActiveSessionPage = () => {
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const { forceRerender } = useUtil()
  const dispatch = useDispatch()

  const [userAnswers, setUserAnswers] = useState<Array<IUserAnswer>>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const sessionRecordFetch = useFetchSessionRecord(Number(sessionId))
  const changeAttemptOptionMutation = useChangeAttemptOptionMutation()
  const sessionFetch = useFetchSession(Number(sessionId))

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

  useEffect(() => {
    dispatch(hideSidebar())
    return () => {
      dispatch(showSidebar())
    }
  }, [])

  if (sessionRecordFetch.isLoading || sessionFetch.isLoading) return <LoadingPage />

  if ((sessionFetch.data as ISession).state != SessionState.ACTIVE)
    return <h1>Session has finished</h1>

  const sessionRecord = sessionRecordFetch.data as Array<Record>

  const questionComponent = sessionRecord.map((record, index) => (
    <Fade in={currentQuestion == index} mountOnEnter unmountOnExit>
      <Box
        sx={{ mb: "40px", display: currentQuestion == index ? "block" : "none"}}
        key={record.question.id}
      >
        <QuestionForm
          questionId={record.question.id}
          questionNo={index + 1}
          initAnswer={record.option ? record.option!.id : undefined}
          onUserAnswer={(optionId) => {
            changeAttemptOptionMutation
              .mutateAsync(({questionId: record.question.id, optionId, sessionId: Number(sessionId)}))
              .then(() => sessionRecordFetch.refetch())
              .then(({data: records}) => {
                if (records == undefined) return
                setUserAnswers(
                  records.map((r) => ({
                    questionId: r.question.id,
                    answerOptionId: r.option == undefined ? undefined : r.option.id
                  }))
                )
              })
            forceRerender()
          }}
        />
      </Box>
    </Fade>
  ))

  return (
    <Page sx={{ padding: { xs: "20px", md: "40px 200px" } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <Box sx={{display: "flex", alignItems: "center"}}>
          <Box sx={{mr: "20px"}}>
            <Typography variant='h6'>
              {`${currentQuestion + 1}/${sessionRecord.length}`}
            </Typography>
          </Box>
          <IconButton
            disabled={currentQuestion == 0}
            onClick={() => setCurrentQuestion(prevState => prevState - 1)}
          >
            <ArrowBackIcon />
          </IconButton>
          <IconButton
            disabled={currentQuestion == sessionRecord.length - 1}
            onClick={() => setCurrentQuestion(prevState => prevState + 1)}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Box>
        <Box>
          <Button
            variant="contained"
            onClick={async () => {
              navigate(getFinishedSessionPageURL(sessionId))
            }}
            disabled={getProgress(userAnswers) < 100}
          >
            Submit
          </Button>
        </Box>
      </Box>
      <Box sx={{mt: "20px"}}>
        {questionComponent}
      </Box>
    </Page>
  )
}

export default ActiveSessionPage
