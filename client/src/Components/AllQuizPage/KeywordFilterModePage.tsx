import React, { FC, useEffect, useState } from "react"
import { SubPageProps } from "./index"
import Page from "../../Containers/Page"
import { Box, Button, Grid, TextField } from "@mui/material"
import Quiz from "./Quiz"
import { useNavigate } from "react-router-dom"
import { getAllQuizPageURL } from "../../routes"
import NoResult from "./NoResult"

interface KeywordFilterModeProps extends SubPageProps {
  keyword: string
}

const KeywordFilterModePage: FC<KeywordFilterModeProps> = ({
  quizzes,
  keyword
}) => {
  const [searchInput, setSearchInput] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    setSearchInput(keyword)
  }, [keyword])

  return (
    <Page sx={{ padding: { xs: "20px", md: "40px" } }}>
      <Box sx={{ mb: "20px", padding: "10px" }}>
        <form
          style={{ width: "100%", display: "flex" }}
          onSubmit={(e) => {
            e.preventDefault()
            navigate(`${getAllQuizPageURL()}?keyword=${searchInput}`)
          }}
        >
          <TextField
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button type="submit">Research</Button>
        </form>
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

export default KeywordFilterModePage
