import React, { ReactNode, useMemo, useState } from "react"
import { Box } from "@mui/material"
import PCNavigationPanel from "./PCNavigationPanel"
import MobileNavigationPanel from "./MobileNavigationPanel"
import { useNavigate } from "react-router-dom"
import {
  getAllQuizPageURL,
  getHomePageURL,
  getUserQuizPageURL
} from "../../routes"
import QuizCreationModal from "../QuizCreationModal"
import HomeIcon from "@mui/icons-material/Home"
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import PortraitIcon from "@mui/icons-material/Portrait"
import { useAuth } from "../../Providers/AuthProvider"

interface NavigationOption {
  text: string
  icon: ReactNode
  onClick: () => void
}

export interface NavigationPanelProps {
  navOptions: Array<NavigationOption>
}

const NavigationPanel = () => {
  const navigate = useNavigate()
  const { getCurrentUser } = useAuth()
  const username = useMemo(
    () => getCurrentUser()!.getUsername(),
    [getCurrentUser]
  )

  const [openQuizCreator, setOpenQuizCreator] = useState(false)

  const navOptions: Array<NavigationOption> = useMemo(
    () => [
      {
        text: "Home",
        icon: <HomeIcon />,
        onClick: () => navigate(getHomePageURL())
      },
      {
        text: "All Quizzes",
        icon: <QuestionAnswerIcon />,
        onClick: () => navigate(getAllQuizPageURL())
      },
      {
        text: "Your Quizzes",
        icon: <PortraitIcon />,
        onClick: () => navigate(getUserQuizPageURL(username))
      },
      {
        text: "Create Quiz",
        icon: <AddCircleIcon />,
        onClick: () => setOpenQuizCreator(true)
      }
    ],
    []
  )

  return (
    <Box>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <PCNavigationPanel navOptions={navOptions} />
      </Box>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <MobileNavigationPanel navOptions={navOptions} />
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
