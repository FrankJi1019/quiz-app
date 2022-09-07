import Page from "../../Containers/Page"
import { IQuiz } from "../../types/IQuiz"
import React, {useCallback, useMemo} from "react"
import { Box, Button, Typography } from "@mui/material"
import moment from "moment"
import BackButton from "../BackButton"
import {getAllQuizPageURL, getQuizStartPageURL, getSessionPageURL} from "../../routes"
import Topic from "../Topic"
import LoadingPage from "../LoadingPage"
import {useFetchQuiz, useFetchQuizQuestionCount} from "../../Api/QuizAPI"
import { useNavigate, useParams } from "react-router-dom"
import {useCreateSessionMutation, useFetchSession} from "../../Api/SessionAPI";
import {useAuth} from "../../Providers/AuthProvider";
import {ISession} from "../../types/Session";

const QuizReadyPage = () => {
  const { quizId } = useParams()
  const navigate = useNavigate()
  const { getCurrentUser } = useAuth()

  const username = getCurrentUser()!.getUsername()

  const quizFetch = useFetchQuiz(Number(quizId))
  const questionCountFetch = useFetchQuizQuestionCount(Number(quizId))
  const sessionFetch = useFetchSession(Number(quizId), username)
  const createSessionMutation = useCreateSessionMutation()

  const noSessionButton = useCallback((disabled: boolean) => (
    <Button
      variant="contained"
      onClick={() => {
        createSessionMutation
          .mutateAsync({quizId: Number(quizId), username})
          .then((response) => {
            navigate(getSessionPageURL(response.id))
          })
      }}
      disabled={disabled}
    >
      Start
    </Button>
  ), [quizId])

  const sessionExistsButton = useCallback((session: ISession, disabled: boolean) => (
    <>
      <Button
        variant="contained"
        onClick={() => navigate(getSessionPageURL(session.id))}
        disabled={disabled}
      >
        Resume Quiz
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          createSessionMutation
            .mutateAsync({quizId: Number(quizId), username})
            .then((response) => {
              navigate(getSessionPageURL(response.id))
            })
        }}
        disabled={disabled}
      >
        Start new Quiz
      </Button>
    </>
  ), [quizId])

  if (quizFetch.isLoading || questionCountFetch.isLoading) return <LoadingPage />

  const quiz = quizFetch.data as IQuiz
  const questionCount = questionCountFetch.data as number

  return (
    <Page sx={{ padding: { xs: "20px", md: "50px" } }}>
      <Box>
        <BackButton url={getAllQuizPageURL()} />
      </Box>
      <Typography variant="h4" sx={{ textAlign: "center", mb: "20px" }}>
        {quiz.name}
      </Typography>
      <Box
        sx={{
          pb: "10px",
          mb: "10px",
          borderBottom: "2px solid #ccc"
        }}
      >
        <Typography variant="body1">{`Created by ${quiz.authorUsername}`}</Typography>
        <Typography variant="body1">
          {`Created on ${moment(new Date(quiz.createdAt)).format(
            "YYYY-MM-DD"
          )}`}
        </Typography>
      </Box>
      <Box sx={{ mb: "50px" }}>{quiz.description}</Box>
      <Box sx={{ mb: "20px" }}>
        {questionCount !== 0
          ? `Number of question: ${questionCount}`
          : "The author has not published any questions to this quiz"}
      </Box>
      <Box>
        {quiz.topics.map((topic) => (
          <Topic text={topic} key={topic} />
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          mt: "20px",
          justifyContent: "flex-end"
        }}
      >
        {
          sessionFetch.isLoading || (
            (sessionFetch.data as Array<ISession>).length == 0 ?
              noSessionButton(questionCount === 0) :
              sessionExistsButton((sessionFetch.data as Array<ISession>)[0], questionCount === 0)
          )
        }
      </Box>
    </Page>
  )
}

export default QuizReadyPage
