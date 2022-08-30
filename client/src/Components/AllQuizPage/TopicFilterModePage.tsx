import React, { FC } from "react"
import { SubPageProps } from "./index"
import Page from "../../Containers/Page"
import { Box, Grid, Typography, useTheme } from "@mui/material"
import Quiz from "./Quiz"
import NoResult from "./NoResult"

interface TopicFilterModeProps extends SubPageProps {
  topic: string
}

const TopicFilterModePage: FC<TopicFilterModeProps> = ({ quizzes, topic }) => {
  const theme = useTheme()

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
            color: theme.palette.secondary.dark,
            fontSize: {
              xs: "25px",
              md: theme.typography.h1.fontSize
            }
          }}
        >
          {topic}
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

export default TopicFilterModePage
