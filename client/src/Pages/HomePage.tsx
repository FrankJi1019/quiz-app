import Page from "../Containers/Page"
import React, { useState } from "react"
import { Box, Button, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { getQuizListPageURL } from "../routes"

const HomePage = () => {
  const navigate = useNavigate()

  const [keyword, setKeyword] = useState("")

  return (
    <Page
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Box
        sx={{
          width: "70%",
          transform: "translateY(-70px)"
        }}
      >
        <Box>
          <Typography
            variant="h1"
            sx={{
              textAlign: "center",
              fontSize: {
                xs: "30px",
                sm: "60px",
                md: "100px"
              }
            }}
          >
            Get Started
          </Typography>
        </Box>
        <Box
          sx={{
            mt: "20px",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <form
            style={{
              width: "100%",
              display: "flex"
            }}
            onSubmit={(e) => {
              e.preventDefault()
              if (keyword.trim() === "") return
              navigate(`${getQuizListPageURL()}?keyword=${keyword}`)
            }}
          >
            <TextField
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button type="submit">Research</Button>
          </form>
        </Box>
      </Box>
    </Page>
  )
}

export default HomePage
