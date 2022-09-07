import React from "react"
import Page from "../../Containers/Page"
import { useNavigate, useParams } from "react-router-dom"
import { IQuiz } from "../../types/IQuiz"
import {useFetchQuestionsByQuizId, useFetchQuiz} from "../../Api/QuizAPI"
import { Box, Button, Typography, useTheme } from "@mui/material"
import { IQuestion } from "../../types/IQuestion"
import {
  getCreateQuestionPageURL,
  getQuestionDetailPageURL
} from "../../routes"
import PersonIcon from "@mui/icons-material/Person"
import Question from "./Question"
import Topic from "../Topic"

const QuizDetailPage = () => {
  const { quizId } = useParams()
  const navigate = useNavigate()
  const theme = useTheme()

  const quizFetch = useFetchQuiz(Number(quizId))
  const questionsFetch = useFetchQuestionsByQuizId(Number(quizId))

  if (quizFetch.isLoading || questionsFetch.isLoading) return null

  const quiz = quizFetch.data as IQuiz
  const questions = questionsFetch.data as Array<IQuestion>

  return (
    <Page>
      <Box
        sx={{
          backgroundColor: theme.palette.grey.A100,
          minHeight: {
            xs: "120px",
            md: "140px"
          },
          padding: {
            xs: "5px 20px",
            md: "10px 50px"
          },
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column"
        }}
      >
        <Box sx={{ width: "100%", mb: { xs: "20px", md: "0" } }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              color: theme.palette.primary.dark,
              fontSize: {
                xs: "25px",
                md: theme.typography.h1.fontSize
              }
            }}
          >
            {quiz.name}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexDirection: { xs: "column", md: "row" }
          }}
        >
          <Box sx={{ display: "flex" }}>
            <PersonIcon />
            <Typography
              variant="h6"
              sx={{
                textAlign: "right",
                fontWeight: "400",
                fontSize: {
                  xs: "15px",
                  md: "auto"
                }
              }}
            >
              {quiz.authorUsername}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: { xs: "100%", md: "40%" },
              flexWrap: "wrap",
              justifyContent: "flex-end"
            }}
          >
            {quiz.topics.map((topic) => (
              <Box sx={{ ml: { xs: "3px", md: "10px" } }}>
                <Topic text={topic} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box sx={{ margin: { xs: "10px", md: "50px" } }}>
        <Box sx={{ padding: "10px" }}>{quiz.description}</Box>
        <Box>
          {questions.map((question) => (
            <Box
              onClick={() =>
                navigate(getQuestionDetailPageURL(quizId, question.id))
              }
              sx={{ margin: "20px 0" }}
            >
              <Question question={question} />
            </Box>
          ))}
          {questions.length === 0 && (
            <Typography
              sx={{
                color: "#777777",
                padding: "10px",
                mb: "30px"
              }}
            >
              You have not created any question
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: {
              xs: "flex-end",
              md: "flex-start"
            }
          }}
        >
          <Button onClick={() => navigate(getCreateQuestionPageURL(quizId))}>
            Add Question
          </Button>
        </Box>
      </Box>
    </Page>
  )
}

export default QuizDetailPage
