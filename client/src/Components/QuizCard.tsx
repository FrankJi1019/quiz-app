import React, { FC } from "react"
import { IQuiz } from "../types/IQuiz"
import {Box, Grid, IconButton, Paper, Typography, useTheme} from "@mui/material"
import moment from "moment"
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

interface IProps {
  quiz: IQuiz
  onClick: (quiz: IQuiz) => void
  onDelete?: (quiz: IQuiz) => void
}

const QuizCard: FC<IProps> = ({ quiz, onClick, onDelete}) => {

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
        onClick={() => onClick(quiz)}
        sx={{
          position: "relative",
          padding: "15px",
          cursor: "pointer",
          transition: ".2s",
          "&:hover": {
            color: theme.palette.primary.dark,
            transform: "scale(1.05)"
          }
        }}
      >
        <IconButton
          sx={{
            display: onDelete != undefined ? "block" : "none",
            position: onDelete != undefined ? "absolute" : "none",
            top: "5px",
            right: "5px",
            "&:hover": {
              color: theme.palette.warning.main
            }
          }}
          onClick={(e) => {
            e.stopPropagation()
            onDelete != undefined && onDelete(quiz)
          }}
        >
          <RemoveCircleIcon/>
        </IconButton>
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
          <Box>{quiz.authorUsername}</Box>
          <Box>{moment(new Date(quiz.createdAt)).format("YYYY-MM-DD")}</Box>
        </Box>
      </Paper>
    </Grid>
  )
}

export default QuizCard
