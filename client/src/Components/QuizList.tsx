import React, {FC} from "react"
import {IQuiz} from "../types/IQuiz";
import {Box, Grid, Typography} from "@mui/material";
import QuizCard from "./QuizCard";
import NoResultText from "./NoResultText";

interface QuizListProps {
  quizzes: Array<IQuiz>
  onQuizClick: (quiz: IQuiz) => void
  onQuizDelete?: (quiz: IQuiz) => void
}

const QuizList: FC<QuizListProps> = ({quizzes, onQuizClick, onQuizDelete}) => {

  if (quizzes.length === 0) {
    return (
      <Box>
        <NoResultText />
      </Box>
    )
  } else {
    return (
      <Grid container>
        {
          quizzes.map((quiz) => (
            <QuizCard quiz={quiz} onClick={onQuizClick} onDelete={onQuizDelete} />
          ))
        }
      </Grid>
    )
  }

}

export default QuizList
