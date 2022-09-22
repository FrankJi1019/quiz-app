import React from 'react'
import {useNavigate, useParams} from "react-router-dom";
import Page from "../Containers/Page";
import Title from "../Components/Title";
import {Box, Slide} from "@mui/material";
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
    <Page sx={{ padding: { xs: "10px", md: "10px 30px" } }}>
      <Box>
        <Title data={"You have attempted"} />
      </Box>
      <Box sx={{overflow: "hidden"}}>
        <Slide in direction="down">
          <Box>
            <QuizList
              quizzes={data.map(q => ({...q, sessionCount: 0}))}
              onQuizClick={(quiz: IQuiz) => navigate(getPastSessionPageURL(quiz.id))}
            />
          </Box>
        </Slide>
      </Box>
    </Page>
  )

}

export default AttemptedQuizListPage
