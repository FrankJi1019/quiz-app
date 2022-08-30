import React, { FC } from "react"
import { IQuiz } from "../../../types/IQuiz"
import { Box, Grid, Paper, Typography, useTheme } from "@mui/material"
import moment from "moment"
import { getQuizReadyPageURL } from "../../routes"
import { useNavigate } from "react-router-dom"

interface IProps {
  quiz: IQuiz
}

const Quiz: FC<IProps> = ({ quiz }) => {
  const navigate = useNavigate()
  const theme = useTheme()

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      sx={{
        padding: "10px"
      }}
    >
      <Paper
        elevation={3}
        onClick={() => navigate(getQuizReadyPageURL(quiz.id))}
        sx={{
          padding: "15px",
          cursor: "pointer",
          transition: ".2s",
          "&:hover": {
            color: theme.palette.primary.dark,
            transform: "translateY(-10px)"
          }
        }}
      >
        <Typography
          variant="h5"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {quiz.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: "10px"
          }}
        >
          <Box>{quiz.authorId}</Box>
          <Box>{moment(new Date(quiz.createdAt)).format("YYYY-MM-DD")}</Box>
        </Box>
      </Paper>
    </Grid>
  )
}

export default Quiz
