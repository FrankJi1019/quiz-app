import React from "react"
import Page from "../../Containers/Page"
import { Box, Grid, Typography, useTheme } from "@mui/material"
import { useParams } from "react-router-dom"
import { IQuiz } from "../../../types/IQuiz"
import LoadingPage from "../LoadingPage"
import {useFetchUserQuizzes} from "../../Api/UserAPI"
import Quiz from "./Quiz"
import NoResult from "../AllQuizPage/NoResult"

const UserQuizPage = () => {

  const { username } = useParams()
  const theme = useTheme()

  const quizzesFetch = useFetchUserQuizzes(username as string)

  if (quizzesFetch.isLoading) return <LoadingPage />

  const quizzes = quizzesFetch.data as Array<IQuiz>

  return (
    <Page sx={{ padding: { xs: "20px", md: "40px" } }}>
      <Box
        sx={{
          mb: "20px",
          pb: "10px",
          borderBottom: "2px solid #cccccc"
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: theme.palette.primary.dark,
            fontSize: {
              xs: "25px",
              md: theme.typography.h1.fontSize
            }
          }}
        >
          Quizzes that you created
        </Typography>
      </Box>
      {quizzes.length !== 0 ? (
        <Grid container>
          {
            quizzes.map((quiz) => (
              <Quiz
                quiz={quiz}
                onDelete={() => quizzesFetch.refetch()}
              />
            ))
          }
        </Grid>
      ) : (
        <NoResult />
      )}
    </Page>
  )
}

export default UserQuizPage
