import React, {ReactNode, useEffect, useMemo, useState} from "react"
import {Box, useTheme} from "@mui/material"
import PCNavigationPanel from "./PCNavigationPanel"
import MobileNavigationPanel from "./MobileNavigationPanel"
import {useLocation, useNavigate} from "react-router-dom"
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
  shouldHighlight: () => boolean
}

export interface NavigationPanelProps {
  navOptions: Array<NavigationOption>
  onLogout: () => void
  onGoHome: () => void
}

const NavigationPanel = () => {
  const navigate = useNavigate()
  const { getCurrentUser } = useAuth()
  const username = useMemo(
    () => getCurrentUser()!.getUsername(),
    [getCurrentUser]
  )
  const theme = useTheme()

  const [navigatorType, setNavigatorType] = useState<"pc" | "mobile" | null>(null)
  const [openQuizCreator, setOpenQuizCreator] = useState(false)

  const dispatch = useDispatch()
  const { logout } = useAuth()
  const { pathname } = useLocation()

  const navOptions: Array<NavigationOption> = useMemo(
    () => [
      {
        text: "Home",
        icon: <HomeIcon />,
        onClick: () => navigate(getHomePageURL()),
        shouldHighlight: () => pathname === getHomePageURL()
      },
      {
        text: "All Quizzes",
        icon: <QuestionAnswerIcon />,
        onClick: () => navigate(getQuizListPageURL()),
        shouldHighlight: () => pathname === getQuizListPageURL()
      },
      {
        text: "Your Quizzes",
        icon: <PortraitIcon />,
        onClick: () => navigate(getUserQuizPageURL(username)),
        shouldHighlight: () => new RegExp("^" + getUserQuizPageURL(".*") + "$").test(pathname)
      },
      {
        text: "Attempted Quizzes",
        icon: <PortraitIcon />,
        onClick: () => navigate(getAttemptedQuizzesPageURL(username)),
        shouldHighlight: () => new RegExp("^" + getAttemptedQuizzesPageURL(".*") + "$").test(pathname)
      },
      {
        text: "Create Quiz",
        icon: <AddCircleIcon />,
        onClick: () => setOpenQuizCreator(true),
        shouldHighlight: () => false
      }
    ],
    [navigate]
  )

  const data = {
    navOptions,
    onLogout: () => {
      logout()
      dispatch(resetTheme())
    },
    onGoHome: () => {
      navigate(getHomePageURL())
    }
  } as NavigationPanelProps

  useEffect(() => {
    const resizeHandler = () => {
      if (window.innerWidth > theme.breakpoints.values.md) {
        setNavigatorType("pc")
      } else {
        setNavigatorType("mobile")
      }
    }
    resizeHandler()
    window.addEventListener("resize", resizeHandler)
    return () => window.removeEventListener("resize", resizeHandler)
  }, [])

  return (
    <>
      {
        navigatorType == "pc" ?
          <PCNavigationPanel {...data} /> : <MobileNavigationPanel {...data} />
      }
      <Box>
        <QuizCreationModal
          open={openQuizCreator}
          onClose={() => setOpenQuizCreator(false)}
        />
      </Box>
    </>
  )
}

export default NavigationPanel
