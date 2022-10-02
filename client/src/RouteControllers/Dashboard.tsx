import {Box} from "@mui/material"
import React from "react"
import {Navigate, Route, Routes} from "react-router-dom"
import {
  getActiveSessionPageURL,
  getAttemptedQuizzesPageURL,
  getCreateQuestionPageURL,
  getFinishedSessionPageURL,
  getHomePageURL,
  getPastSessionPageURL,
  getProfilePageURL,
  getQuestionDetailPageURL,
  getQuestionResultPageURL,
  getQuizIntroPageURL,
  getQuizListPageURL,
  getQuizManagingPageURL,
  getUserQuizPageURL
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
import QuestionResultPage from "../Pages/QuestionResultPage";
import ProfilePage from "../Pages/ProfilePage";
import QuizCreationModal from "../Components/QuizCreationModal";
import {hideAllModal, ModalType} from "../Slices/modalSlice";

const Dashboard = () => {

  const dispatch = useDispatch()
  const showModal = useSelector(state => (state as {modal: ModalType}).modal)

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
        <Route path={getPastSessionPageURL()} element={<PastSessionPage />} />
        <Route path={getQuestionResultPageURL()} element={<QuestionResultPage />} />
        <Route path={getProfilePageURL()} element={<ProfilePage />} />
        <Route path={"*"} element={<Navigate to={getHomePageURL()} />} />
      </Routes>
      <ThemeSelectorModal
        open={showModal === ModalType.THEME_SELECTOR}
        onClose={() => dispatch(hideAllModal())}
      />
      <QuizCreationModal
        open={showModal === ModalType.QUIZ_CREATION_FORM}
        onClose={() => dispatch(hideAllModal())}
      />
    </Box>
  )
}

export default Dashboard
