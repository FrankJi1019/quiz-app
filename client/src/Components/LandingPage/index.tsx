import React, { FC, useMemo } from "react"
import Page from "../../Containers/Page"
import SignupForm from "./SignupForm"
import LoginForm from "./LoginForm"
import ConfirmationForm from "./ConfirmationForm"
import { Box, Typography, useTheme } from "@mui/material"

interface LandingPageProps {
  mode: "login" | "signup" | "confirm"
}

const LandingPage: FC<LandingPageProps> = ({ mode }) => {
  const theme = useTheme()

  const form = useMemo(() => {
    if (mode === "login") return <LoginForm />
    else if (mode === "signup") return <SignupForm />
    else return <ConfirmationForm />
  }, [mode])

  return (
    <Page
      sx={{
        background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100%"
      }}
    >
      <Box sx={{ width: { xs: "80%", sm: "60%", md: "40%" } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: { xs: "20px", md: "40px" }
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: "40px",
              background: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
              fontStyle: "italic"
            }}
          >
            QUIZZY
          </Typography>
        </Box>
        <Box
          sx={{
            boxShadow: "0px 0px 10px 4px rgba(0, 0, 0, .3)",
            padding: {
              xs: "1px 10px 30px",
              md: "1px 40px 30px"
            },
            borderRadius: "5px",
            mt: "40px",
            backgroundColor: "#EEEEEE"
          }}
        >
          {form}
        </Box>
      </Box>
    </Page>
  )
}

export default LandingPage
