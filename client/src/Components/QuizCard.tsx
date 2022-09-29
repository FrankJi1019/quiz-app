import React, { FC } from "react"
import { IQuiz } from "../types/IQuiz"
import {Box, Button, Grid, IconButton, Paper, Typography, useTheme} from "@mui/material"
import moment from "moment"
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CircleIcon from '@mui/icons-material/Circle';
import {useUtil} from "../Providers/UtilProvider";

interface IProps {
  quiz: IQuiz
  onClick: (quiz: IQuiz) => void
  onDelete?: (quiz: IQuiz) => void
}

const QuizCard: FC<IProps> = ({ quiz, onClick, onDelete}) => {

  const theme = useTheme()
  const {getScreenSize} = useUtil()

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      sx={{
        padding: "5px 15px 20px"
      }}
    >
      <Box
        onClick={getScreenSize() < theme.breakpoints.values.md ? (() => onClick(quiz)) : undefined}
        sx={{
          userSelect: 'none',
          position: "relative",
          padding: "15px",
          transition: ".2s",
          boxShadow: "2px 2px 5px 2px " + theme.palette.primary.dark + "99",
          borderRadius: "5px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            borderBottom: "1px solid #ccc",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Typography
            variant="h5"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              pb: "5px"
            }}
          >
            {quiz.name}
          </Typography>
          <IconButton
            sx={{
              display: onDelete != undefined ? "block" : "none",
              "&:hover": {color: "error.main"}
            }}
            onClick={(e) => {
              e.stopPropagation()
              onDelete != undefined && onDelete(quiz)
            }}
          >
            <RemoveCircleIcon/>
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: 'center',
            mt: "10px",
            fontSize: "14px"
          }}
        >
          <Box>{quiz.questionCount} Questions</Box>
          {
            Boolean(quiz.sessionCount) && (
              <>
                <CircleIcon sx={{fontSize: "7px", marginX: "7px"}} />
                <Box>{quiz.sessionCount} Attempts</Box>
              </>
            )
          }
        </Box>
        <Box
          sx={{
            display: {
              xs: "none",
              md: 'flex'
            },
            flexDirection: 'row-reverse',
            mt: "5px"
          }}
        >
          <Button
            onClick={() => onClick(quiz)}
            sx={{
              padding: "3px"
            }}
          >
            View
          </Button>
        </Box>
      </Box>
    </Grid>
  )
}

export default QuizCard
