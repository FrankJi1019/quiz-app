import React, { FC } from "react"
import { SubPageProps } from "./index"
import Page from "../../Containers/Page"
import { Grid } from "@mui/material"
import Quiz from "./Quiz"
import NoResult from "./NoResult"

const AllQuizModePage: FC<SubPageProps> = ({ quizzes }) => {
  return (
    <Page>
      {quizzes.length !== 0 ? (
        <Grid container sx={{ padding: { xs: "20px", md: "40px" } }}>
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

export default AllQuizModePage
