import React, {useCallback} from "react"
import Page from "../Containers/Page"
import {useNavigate, useParams} from "react-router-dom"
import {IQuiz} from "../types/IQuiz"
import {
  useAddTopicToQuizMutation,
  useFetchQuestionsByQuizId,
  useFetchQuiz,
  useRemoveTopicToQuizMutation
} from "../Api/QuizAPI"
import {Box, Grid, IconButton, Typography, useTheme} from "@mui/material"
import {IQuestion} from "../types/IQuestion"
import {getCreateQuestionPageURL, getQuestionDetailPageURL} from "../routes"
import QuestionOverview from "../Components/QuestionOverview"
import TopicList from "../Components/TopicList";
import {useFetchTopics} from "../Api/TopicAPI";
import AddIcon from '@mui/icons-material/Add';
import {useDispatch} from "react-redux";
import {showNotification} from "../Slices/modalSlice";

const QuizManagingPage = () => {
  const {quizId} = useParams()
  const navigate = useNavigate()
  const theme = useTheme()
  const dispatch = useDispatch()

  const quizFetch = useFetchQuiz(Number(quizId))
  const questionsFetch = useFetchQuestionsByQuizId(Number(quizId))
  const topicsFetch = useFetchTopics()
  const addTopicMutation = useAddTopicToQuizMutation()
  const removeTopicMutation = useRemoveTopicToQuizMutation()

  const removeTopic = useCallback(async (topic: string) => {
    await removeTopicMutation.mutateAsync({id: Number(quizId), topic})
    quizFetch.refetch()
  }, [])

  const addTopic = useCallback(async (topic: string) => {
    await addTopicMutation.mutateAsync({id: Number(quizId), topic})
    quizFetch.refetch()
  }, [])

  if (quizFetch.isLoading || questionsFetch.isLoading) return null

  const quiz = quizFetch.data as IQuiz
  const questions = questionsFetch.data as Array<IQuestion>
  const topics = topicsFetch.isLoading ? [] : topicsFetch.data!.map(t => t.name) as Array<string>

  return (
    <Page>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: {xs: "10px", md: "50px"}
        }}
      >
        <Box sx={{mb: {xs: "20px", md: "0"}}}>
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              color: "grey.A700",
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
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexDirection: {xs: "column", md: "row"}
          }}
        >
          <TopicList
            topics={quiz.topics}
            onClick={() => {}}
            onDelete={quiz.topics.length > 1 ?
              removeTopic :
              () => dispatch(showNotification("You cannot at least the last topic"))
            }
            onAdd={quiz.topics.length <= 2 ? addTopic : undefined}
            topicPool={topics.filter(x => !quiz.topics.includes(x))}
          />
        </Box>
      </Box>
      <Box sx={{margin: {xs: "10px", md: "50px"}}}>
        {
          quiz.description && <Box sx={{padding: "10px"}}>{quiz.description}</Box>
        }
        <Grid container>
          {
            questions.map((question) => (
              <Grid item xs={12} sm={6} md={4}
                    sx={{padding: "20px 10px"}}
              >
                <QuestionOverview
                  question={question}
                  onClick={(q) => navigate(getQuestionDetailPageURL(quizId, q.id))}
                />
              </Grid>
            ))
          }
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              padding: "20px 10px",
              display: "flex",
              alignItems: "center"
            }}
          >
            <Box
              onClick={() => navigate(getCreateQuestionPageURL(quizId))}
              sx={{
                width: "100%",
                cursor: "pointer",
                border: "2px dashed #ccc",
                borderRadius: "5px",
                transition: ".2s",
                display: "flex",
                alignItems: "center",
                padding: "9px",
                "&:hover": {
                  transform: "translateY(-3px)",
                  borderColor: "primary.dark"
                }
              }}
            >
              <IconButton>
                <AddIcon/>
              </IconButton>
              <Box>
                New Question
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Page>
  )
}

export default QuizManagingPage
