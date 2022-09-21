import Page from "../Containers/Page"
import React from "react"
import {Box, Typography, useTheme} from "@mui/material"
import {createSearchParams, useNavigate} from "react-router-dom"
import {getQuizIntroPageURL, getQuizListPageURL} from "../routes"
import background from "../Assets/background.png"
import SearchBar from "../Components/SearchBar";
import {useFetchTopTopics} from "../Api/TopicAPI";
import TopicList from "../Components/TopicList";
import PageTitle from "../Components/PageTitle";
import {useFetchTopQuizzes} from "../Api/QuizAPI";
import {IQuiz} from "../types/IQuiz";
import QuizList from "../Components/QuizList";

const HomePage = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const fetchTopTopics = useFetchTopTopics()
  const fetchTopQuizzes = useFetchTopQuizzes()

  const topics = fetchTopTopics.isLoading ? [] : fetchTopTopics.data as Array<string>
  const quizzes = fetchTopQuizzes.isLoading ? [] : fetchTopQuizzes.data as Array<IQuiz>

  return (
    <Page
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <Box
        sx={{
          width: "100%",
          background: `url(${background}) center center`,
          backgroundSize: "cover",
          padding: "150px 100px",
          boxSizing: "border-box",
          position: 'relative',
          '&::before': {
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: 'rgba(255, 255, 255, .4)',
            content: '""'
          }
        }}
      >
        <Box>
          <Typography
            variant="h1"
            sx={{
              textAlign: "center",
              fontSize: {
                xs: "20px",
                sm: "30px",
                md: "45px"
              },
              color: theme.palette.primary.dark,
              position: 'relative'
            }}
          >
            Welcome to QUIZZY
          </Typography>
        </Box>
        <Box
          sx={{
            mt: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{width: "70%"}}>
            <SearchBar
              onSearch={(keyword) => {
                if (keyword.trim() === "") return
                navigate(`${getQuizListPageURL()}?keyword=${keyword}`)
              }}
            />
            <Box sx={{mt: '5px', position: 'relative'}}>
              <TopicList
                topics={topics}
                onClick={(topic) => navigate({
                  pathname: getQuizListPageURL(),
                  search: createSearchParams({topic}).toString()
                })}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          padding: "0 20px",
          mt: "40px",
          mb: "100px",
          boxSizing: 'border-box',
        }}
      >
        <PageTitle data="Top Picks" />
        <QuizList
          quizzes={quizzes}
          onQuizClick={(quiz) => navigate({
            pathname: getQuizIntroPageURL(quiz.id)
          })}
        />
      </Box>
    </Page>
  )
}

export default HomePage
