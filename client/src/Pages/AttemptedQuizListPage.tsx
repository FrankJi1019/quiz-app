import React, {useMemo} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import Page from "../Containers/Page";
import PageTitle from "../Components/PageTitle";
import {Box} from "@mui/material";
import {useFetchAttemptedQuizzes} from "../Api/UserAPI";
import LoadingPage from "./LoadingPage";
import {IQuiz} from "../types/IQuiz";
import QuizList from "../Components/QuizList";
import {getPastSessionPageURL} from "../routes";

const AttemptedQuizListPage = () => {

  const {username} = useParams()
  const navigate = useNavigate()

  const attemptedQuizzesFetch = useFetchAttemptedQuizzes(username as string)

  if (attemptedQuizzesFetch.isLoading) return <LoadingPage />

  const data = attemptedQuizzesFetch.data as Array<IQuiz>

  return (
    <Page sx={{ padding: { xs: "20px", md: "40px" } }}>
      <Box>
        <PageTitle data={"You have attempted"} />
      </Box>
      <Box>
        <QuizList
          quizzes={data}
          onQuizClick={(quiz: IQuiz) => navigate(getPastSessionPageURL(quiz.id))}
        />
      </Box>
    </Page>
  )

}

export default AttemptedQuizListPage
