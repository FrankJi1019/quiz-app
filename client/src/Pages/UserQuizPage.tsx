import React from "react"
import Page from "../Containers/Page"
import { Box, useTheme } from "@mui/material"
import {useNavigate, useParams} from "react-router-dom"
import { IQuiz } from "../types/IQuiz"
import LoadingPage from "./LoadingPage"
import {useFetchUserQuizzes} from "../Api/UserAPI"
import QuizList from "../Components/QuizList";
import {getQuizManagingPageURL} from "../routes";
import {useDeleteQuiz} from "../Api/QuizAPI";
import PageTitle from "../Components/PageTitle";

const UserQuizPage = () => {

  const { username } = useParams()
  const navigate = useNavigate()

  const quizzesFetch = useFetchUserQuizzes(username as string)
  const deleteQuizMutation = useDeleteQuiz()

  if (quizzesFetch.isLoading) return <LoadingPage />

  const quizzes = quizzesFetch.data as Array<IQuiz>

  return (
    <Page sx={{ padding: { xs: "20px", md: "40px" } }}>
      <Box>
        <PageTitle data={"Quizzes that you created"} />
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
