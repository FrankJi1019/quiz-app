import React from "react"
import Page from "../Containers/Page"
import { Box, Typography, useTheme } from "@mui/material"
import {useNavigate, useParams} from "react-router-dom"
import { IQuiz } from "../types/IQuiz"
import LoadingPage from "./LoadingPage"
import {useFetchUserQuizzes} from "../Api/UserAPI"
import QuizList from "../Components/QuizList";
import {getQuizManagingPageURL} from "../routes";
import {useDeleteQuiz} from "../Api/QuizAPI";

const UserQuizPage = () => {

  const { username } = useParams()
  const theme = useTheme()
  const navigate = useNavigate()

  const quizzesFetch = useFetchUserQuizzes(username as string)
  const deleteQuizMutation = useDeleteQuiz()

  if (quizzesFetch.isLoading) return <LoadingPage />

  const quizzes = quizzesFetch.data as Array<IQuiz>

  return (
    <Page sx={{ padding: { xs: "20px", md: "40px" } }}>
      <Box
        sx={{
          mb: "20px",
          pb: "10px",
          borderBottom: "2px solid #cccccc"
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: theme.palette.primary.dark,
            fontSize: {
              xs: "25px",
              md: theme.typography.h1.fontSize
            }
          }}
        >
          Quizzes that you created
        </Typography>
      </Box>
      <Box>
        <QuizList
          quizzes={quizzes}
          onQuizClick={(quiz) => navigate(getQuizManagingPageURL(quiz.id))}
          onQuizDelete={(quiz) => {
            deleteQuizMutation.mutateAsync(quiz.id).then(() => quizzesFetch.refetch())
          }}
        />
      </Box>
    </Page>
  )
}

export default UserQuizPage
