import { Box } from "@mui/material"
import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import {
  getHomePageURL,
  getQuizListPageURL,
  getQuizIntroPageURL,
  getQuizManagingPageURL,
  getQuestionDetailPageURL,
  getCreateQuestionPageURL,
  getUserQuizPageURL,
  getActiveSessionPageURL,
  getFinishedSessionPageURL,
  getAttemptedQuizzesPageURL,
  getPastSessionPageURL
} from "../routes"
import QuizListPage from "../Pages/QuizListPage"
import HomePage from "../Pages/HomePage"
import QuizIntroPage from "../Pages/QuizIntroPage"
import ActiveSessionPage from "../Pages/ActiveSessionPage"
import FinishedSessionPage from "../Pages/FinishedSessionPage"
import QuizManagingPage from "../Pages/QuizManagingPage"
import QuestionDetailPage from "../Pages/QuestionDetailPage"
import QuestionCreationPage from "../Pages/QuestionCreationPage"
import NavigationPanel from "../Pages/NavigationPanel"
import UserQuizPage from "../Pages/UserQuizPage"
import AttemptedQuizListPage from "../Pages/AttemptedQuizListPage";
import PastSessionPage from "../Pages/PastSessionPage";
import ThemeSelectorModal from "../Components/ThemeSelectorModal";
import {useDispatch, useSelector} from "react-redux";
import {hideModal} from "../Slices/showThemeSelectorSlice";

const Dashboard = () => {

  const dispatch = useDispatch()
  const showModal = useSelector(state => (state as {showThemeSelector: boolean}).showThemeSelector)

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
        <Route path={getQuizListPageURL()} element={<QuizListPage />} />
        <Route path={getQuizIntroPageURL()} element={<QuizIntroPage />} />
        <Route path={getActiveSessionPageURL()} element={<ActiveSessionPage />} />
        <Route path={getFinishedSessionPageURL()} element={<FinishedSessionPage />} />
        <Route path={getQuizManagingPageURL()} element={<QuizManagingPage />} />
        <Route path={getQuestionDetailPageURL()} element={<QuestionDetailPage />}/>
        <Route path={getCreateQuestionPageURL()} element={<QuestionCreationPage />}/>
        <Route path={getUserQuizPageURL()} element={<UserQuizPage />} />
        <Route path={getAttemptedQuizzesPageURL()} element={<AttemptedQuizListPage />} />
        <Route path={getPastSessionPageURL()} element={<PastSessionPage />} />
        <Route path={"*"} element={<Navigate to={getHomePageURL()} />} />
      </Routes>
      <ThemeSelectorModal
        open={showModal}
        onClose={() => dispatch(hideModal())}
      />
    </Box>
  )
}

export default Dashboard
