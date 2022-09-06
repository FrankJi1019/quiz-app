import Page from "../../Containers/Page"
import { IQuiz } from "../../../types/IQuiz"
import React, { useEffect, useState } from "react"
import { Box, Button, Typography } from "@mui/material"
import moment from "moment"
import BackButton from "../BackButton"
import { getAllQuizPageURL, getQuizStartPageURL } from "../../routes"
import Topic from "../Topic"
import LoadingPage from "../LoadingPage"
import {useFetchQuiz, useFetchQuizQuestionCount} from "../../Api/QuizAPI"
import { useNavigate, useParams } from "react-router-dom"

const QuizReadyPage = () => {
  const { quizId } = useParams()
  const navigate = useNavigate()

  // const [questionCount, setQuestionCount] = useState<number | null>(null)

  const quizFetch = useFetchQuiz(Number(quizId))
  const questionCountFetch = useFetchQuizQuestionCount(Number(quizId))

  // useEffect(() => {
  //   if (quizFetch.data === undefined) return
  //   const quiz = quizFetch.data as IQuiz
  //   getQuestionCount(quiz.id).then((res) => {
  //     setQuestionCount(res.data)
  //   })
  // }, [quizFetch.data])

  if (quizFetch.isLoading || questionCountFetch.isLoading) return <LoadingPage />

  const quiz = quizFetch.data as IQuiz
  const questionCount = questionCountFetch.data as number

  // if (questionCount === null || quiz === null) return <LoadingPage />

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
        <Button
          variant="contained"
          onClick={() => navigate(getQuizStartPageURL(quizId))}
          disabled={questionCount === 0}
        >
          Start
        </Button>
      </Box>
    </Page>
  )
}

export default QuizReadyPage
