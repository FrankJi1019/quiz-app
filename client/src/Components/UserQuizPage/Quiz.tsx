import React, {FC} from "react"
import {IQuiz} from "../../../types/IQuiz"
import {Box, Grid, IconButton, Paper, Typography, useTheme} from "@mui/material"
import moment from "moment"
import {getQuizDetailPageURL} from "../../routes"
import {useNavigate} from "react-router-dom"
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import {useDeleteQuiz} from "../../Api/QuizAPI";
import {useUtil} from "../../Providers/UtilProvider";

interface IProps {
  quiz: IQuiz
  onDelete: () => void
}

const Quiz: FC<IProps> = ({quiz, onDelete}) => {
  const navigate = useNavigate()
  const theme = useTheme()
  const {forceRerender} = useUtil()
  const deleteQuizMutation = useDeleteQuiz()

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
        onClick={() => navigate(getQuizDetailPageURL(quiz.id))}
        sx={{
          position: "relative",
          padding: "15px",
          cursor: "pointer",
          transition: ".2s",
          "&:hover": {
            color: theme.palette.primary.dark,
          }
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: "5px",
            right: "5px",
            "&:hover": {
              color: theme.palette.warning.main
            }
          }}
          onClick={(e) => {
            e.stopPropagation()
            deleteQuizMutation.mutateAsync(quiz.id).then(onDelete)
            // deleteQuiz(quiz.id).then(() => forceRerender())
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
            mt: "20px"
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
