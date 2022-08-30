import { Box } from "@mui/material"
import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import {
  getHomePageURL,
  getAllQuizPageURL,
  getQuizReadyPageURL,
  getQuizStartPageURL,
  getResultPageURL,
  getQuizDetailPageURL,
  getQuestionDetailPageURL,
  getCreateQuestionPageURL,
  getUserQuizPageURL
} from "../routes"
import AllQuizPage from "../Components/AllQuizPage"
import HomePage from "../Components/HomePage"
import QuizReadyPage from "../Components/QuizReadyPage"
import QuizStartPage from "../Components/QuizStartPage"
import ResultPage from "../Components/ResultPage"
import QuizDetailPage from "../Components/QuizDetailPage"
import QuestionDetailPage from "../Components/QuestionDetailPage"
import QuestionCreationPage from "../Components/QuestionCreationPage"
import NavigationPanel from "../Components/NavigationPanel"
import UserQuizPage from "../Components/UserQuizPage"

const Dashboard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        flexDirection: {
          xs: "column",
          md: "row"
        }
      }}
    >
      <NavigationPanel />
      <Routes>
        <Route path={getHomePageURL()} element={<HomePage />} />
        <Route path={getAllQuizPageURL()} element={<AllQuizPage />} />
        <Route path={getQuizReadyPageURL()} element={<QuizReadyPage />} />
        <Route path={getQuizStartPageURL()} element={<QuizStartPage />} />
        <Route path={getResultPageURL()} element={<ResultPage />} />
        <Route path={getQuizDetailPageURL()} element={<QuizDetailPage />} />
        <Route
          path={getQuestionDetailPageURL()}
          element={<QuestionDetailPage />}
        />
        <Route
          path={getCreateQuestionPageURL()}
          element={<QuestionCreationPage />}
        />
        <Route path={getUserQuizPageURL()} element={<UserQuizPage />} />
        <Route path={"*"} element={<Navigate to={getHomePageURL()} />} />
      </Routes>
    </Box>
  )
}

export default Dashboard
