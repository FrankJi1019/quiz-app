import React, { useEffect, useState } from "react"
import Page from "../../Containers/Page"
import { Box, Grid, Typography, useTheme } from "@mui/material"
import { useParams } from "react-router-dom"
import { IQuiz } from "../../../types/IQuiz"
import LoadingPage from "../LoadingPage"
import { getUserQuizzes } from "../../Api/UserAPI"
import Quiz from "./Quiz"
import NoResult from "../AllQuizPage/NoResult"
import {useUtil} from "../../Providers/UtilProvider";

const UserQuizPage = () => {
  const [quizzes, setQuizzes] = useState<Array<IQuiz> | null>(null)

  const { username } = useParams()
  const theme = useTheme()
  const {forceRerender} = useUtil()

  if (username == undefined) return null

  useEffect(() => {
    getUserQuizzes(username).then((res) => setQuizzes(res.data))
  }, [username, forceRerender])

  if (!quizzes) return <LoadingPage />

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
          {quizzes.map((quiz) => (
            <Quiz quiz={quiz} />
          ))}
        </Grid>
      ) : (
        <NoResult />
      )}
    </Page>
  )
}

export default UserQuizPage
