import React, {useMemo} from "react"
import { IQuiz } from "../types/IQuiz"
import {
  useFetchNonEmptyQuizzes,
  useFetchNonEmptyQuizzesByTopic
} from "../Api/QuizAPI"
import LoadingPage from "./LoadingPage"
import {useNavigate, useSearchParams} from "react-router-dom"
import QuizList from "../Components/QuizList";
import Page from "../Containers/Page";
import {Box} from "@mui/material";
import SearchBar from "../Components/SearchBar";
import PageTitle from "../Components/PageTitle";
import {getQuizIntroPageURL} from "../routes";

const QuizListPage = () => {

  const [searchParam, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const topic = useMemo(() => searchParam.get("topic"), [searchParam.get("topic")])
  const keyword = useMemo(() => searchParam.get("keyword"), [searchParam.get("keyword")])

  const {data, isLoading} = (topic != null && topic.trim() != "") ?
    useFetchNonEmptyQuizzesByTopic(topic) : useFetchNonEmptyQuizzes(keyword)

  if (isLoading) return <LoadingPage />

  const quizzes = data as Array<IQuiz>

  return (
    <Page sx={{ padding: { xs: "10px", md: "20px" } }}>

      <Box sx={{display: topic != null ? "block" : "none"}}>
        <PageTitle data={topic as string} />
      </Box>

      <Box sx={{display: keyword != null ? "block" : "none"}}>
        <SearchBar initValue={keyword as string} onSearch={(data) => setSearchParams({keyword: data})} />
      </Box>

      <Box>
        <QuizList quizzes={quizzes} onQuizClick={(quiz) => navigate(getQuizIntroPageURL(quiz.id))} />
      </Box>

    </Page>
  )

}

export default QuizListPage
