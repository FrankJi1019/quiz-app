import React from "react"
import Page from "../Containers/Page"
import {Box, Slide, useTheme} from "@mui/material"
import {useNavigate, useParams} from "react-router-dom"
import { IQuiz } from "../types/IQuiz"
import LoadingPage from "./LoadingPage"
import {useFetchUserQuizzes} from "../Api/UserAPI"
import QuizList from "../Components/QuizList";
import {getQuizManagingPageURL} from "../routes";
import {useDeleteQuiz} from "../Api/QuizAPI";
import Title from "../Components/Title";

const UserQuizPage = () => {

  const { username } = useParams()
  const navigate = useNavigate()

  const quizzesFetch = useFetchUserQuizzes(username as string)
  const deleteQuizMutation = useDeleteQuiz()

  if (quizzesFetch.isLoading) return <LoadingPage />

  const quizzes = quizzesFetch.data as Array<IQuiz>

  return (
    <Page sx={{ padding: { xs: "10px", md: "10px 30px" } }}>
      <Box>
        <Title data={"Quizzes that you created"} />
      </Box>
      <Box sx={{overflow: "hidden"}}>
        <Slide in direction="down">
          <Box>
            <QuizList
              quizzes={quizzes}
              onQuizClick={(quiz) => navigate(getQuizManagingPageURL(quiz.id))}
              onQuizDelete={(quiz) => {
                deleteQuizMutation.mutateAsync(quiz.id).then(() => quizzesFetch.refetch())
              }}
            />
          </Box>
        </Slide>
      </Box>
    </Page>
  )
}

export default UserQuizPage
