import Page from "../Containers/Page"
import { IQuiz } from "../types/IQuiz"
import React, {useCallback, FC} from "react"
import {Box, Button, Typography, useTheme} from "@mui/material"
import moment from "moment"
import {getQuizListPageURL, getActiveSessionPageURL, getQuizIntroPageURL} from "../routes"
import LoadingPage from "./LoadingPage"
import {useFetchQuiz, useFetchQuizQuestionCount, useFetchRelatedQuizzes} from "../Api/QuizAPI"
import {createSearchParams, useNavigate, useParams} from "react-router-dom"
import {useCreateSessionMutation, useFetchActiveSessionByQuizAndUser} from "../Api/SessionAPI";
import {useAuth} from "../Providers/AuthProvider";
import {ISession} from "../types/Session";
import TopicList from "../Components/TopicList";
import Title from "../Components/Title";
import QuizList from "../Components/QuizList";

const InfoCard: FC<{name: string, value: string}> = ({name, value}) => {
  return (
    <Box>
      <Box sx={{fontSize: "25px", textAlign: "center"}}>
        {value}
      </Box>
      <Box>
        {name}
      </Box>
    </Box>
  )
}

const QuizIntroPage = () => {
  const { quizId } = useParams()
  const navigate = useNavigate()
  const { getCurrentUser } = useAuth()

  const username = getCurrentUser()!.getUsername()
  const theme = useTheme()

  const quizFetch = useFetchQuiz(Number(quizId))
  const questionCountFetch = useFetchQuizQuestionCount(Number(quizId))
  const sessionFetch = useFetchActiveSessionByQuizAndUser(Number(quizId), username)
  const createSessionMutation = useCreateSessionMutation()
  const relatedQuizFetch = useFetchRelatedQuizzes(Number(quizId))

  const noSessionButton = useCallback((disabled: boolean) => (
    <Button
      variant="contained"
      onClick={() => {
        createSessionMutation
          .mutateAsync({quizId: Number(quizId), username})
          .then((response) => {
            navigate(getActiveSessionPageURL(response.id))
          })
      }}
      disabled={disabled}
    >
      Start Quiz
    </Button>
  ), [quizId])

  const sessionExistsButton = useCallback((session: ISession, disabled: boolean) => (
    <>
      <Button
        variant="contained"
        onClick={() => navigate(getActiveSessionPageURL(session.id))}
        disabled={disabled}
      >
        Resume Quiz
      </Button>
      <Button
        sx={{ml: "10px"}}
        variant="outlined"
        onClick={() => {
          createSessionMutation
            .mutateAsync({quizId: Number(quizId), username})
            .then((response) => {
              navigate(getActiveSessionPageURL(response.id))
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
    <Page
      sx={{
        padding: {
          xs: "20px",
          md: "20px 30px"
        }
      }}
    >
      <Box
        sx={{
          boxShadow: "0 0 5px 3px rgba(0,0,0,.3)",
          padding: "20px 30px",
          borderRadius: "7px",
          marginX: "20px"
        }}
      >
        <Box
          sx={{
            mb: "20px",
            display: "flex",
            alignItems: "center",
            paddingX: "10px"
          }}
        >
          <Box sx={{mr: "10px", color: theme.palette.grey.A700}}>
            <Typography variant="h2">
              {quiz.name}
            </Typography>
          </Box>
          <Box>
            <TopicList
              topics={quiz.topics}
              onClick={(topic) => navigate({
                pathname: getQuizListPageURL(),
                search: createSearchParams({topic}).toString()
              })}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "2px solid #bbb",
            color: "#666",
            paddingX: "10px"
          }}
        >
          <Box>
            <Box sx={{mb: "5px"}}>
              {quiz.authorName}
            </Box>
            <Box sx={{mb: "20px"}}>
              Created on {moment(quiz.createdAt).format("DD/MM/YYYY")}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex"
            }}
          >
            <Box sx={{mr: "20px"}}>
              <InfoCard name="questions" value={`${quiz.questionCount}`} />
            </Box>
            <Box>
              <InfoCard name="attempts" value={`${quiz.sessionCount}`} />
            </Box>
          </Box>
        </Box>
        <Box sx={{mt: "20px", paddingX: "10px"}}>
          <Typography variant="body1">
            {quiz.description}
          </Typography>
        </Box>
        <Box
          sx={{
            mt: "20px",
            display: "flex",
            justifyContent: "right"
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
      </Box>
      <Box sx={{margin: "50px 20px"}}>
        <Box>
          <Title data="Some other quizzes you may like" variant="h4" />
        </Box>
        <Box>
          {
            relatedQuizFetch.data && (
              <QuizList
                quizzes={relatedQuizFetch.data as Array<IQuiz>}
                onQuizClick={(quiz) => navigate({
                  pathname: getQuizIntroPageURL(quiz.id)
                })}
              />
            )
          }
        </Box>
      </Box>
    </Page>
  )
}

export default QuizIntroPage
