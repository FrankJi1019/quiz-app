import React, { ReactNode, useMemo, useState } from "react"
import { Box } from "@mui/material"
import PCNavigationPanel from "./PCNavigationPanel"
import MobileNavigationPanel from "./MobileNavigationPanel"
import { useNavigate } from "react-router-dom"
import {
  getQuizListPageURL,
  getHomePageURL,
  getUserQuizPageURL, getAttemptedQuizzesPageURL
} from "../routes"
import QuizCreationModal from "../Components/QuizCreationModal"
import HomeIcon from "@mui/icons-material/Home"
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import PortraitIcon from "@mui/icons-material/Portrait"
import { useAuth } from "../Providers/AuthProvider"
import {resetTheme} from "../Slices/themeSlice";
import {useDispatch} from "react-redux";

interface NavigationOption {
  text: string
  icon: ReactNode
  onClick: () => void
}

export interface NavigationPanelProps {
  navOptions: Array<NavigationOption>
  highlightOption: string
  onLogout: () => void
  onGoHome: () => void
}

let highlightOption = "Home"

const NavigationPanel = () => {
  const navigate = useNavigate()
  const { getCurrentUser } = useAuth()
  const username = useMemo(
    () => getCurrentUser()!.getUsername(),
    [getCurrentUser]
  )

  const [openQuizCreator, setOpenQuizCreator] = useState(false)

  const dispatch = useDispatch()
  const { logout } = useAuth()

  const navOptions: Array<NavigationOption> = useMemo(
    () => [
      {
        text: "Home",
        icon: <HomeIcon />,
        onClick: () => {
          navigate(getHomePageURL())
          highlightOption = "Home"
        }
      },
      {
        text: "All Quizzes",
        icon: <QuestionAnswerIcon />,
        onClick: () => {
          navigate(getQuizListPageURL())
          highlightOption = "All Quizzes"
        }
      },
      {
        text: "Your Quizzes",
        icon: <PortraitIcon />,
        onClick: () => {
          navigate(getUserQuizPageURL(username))
          highlightOption = "Your Quizzes"
        }
      },
      {
        text: "Attempted Quizzes",
        icon: <PortraitIcon />,
        onClick: () => {
          navigate(getAttemptedQuizzesPageURL(username))
          highlightOption = "Attempted Quizzes"
        }
      },
      {
        text: "Create Quiz",
        icon: <AddCircleIcon />,
        onClick: () => setOpenQuizCreator(true)
      }
    ],
    []
  )

  const data = {
    navOptions, highlightOption,
    onLogout: () => {
      logout()
      dispatch(resetTheme())
      highlightOption = "Home"
    },
    onGoHome: () => {
      navigate(getHomePageURL())
      highlightOption = "Home"
    }
  } as NavigationPanelProps

  return (
    <Box>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <PCNavigationPanel {...data} />
      </Box>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <MobileNavigationPanel {...data} />
      </Box>
      <Box>
        <QuizCreationModal
          open={openQuizCreator}
          onClose={() => setOpenQuizCreator(false)}
        />
      </Box>
    </Box>
  )
}

export default NavigationPanel
