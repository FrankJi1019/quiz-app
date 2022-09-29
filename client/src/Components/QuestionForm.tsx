import React, {FC, useState} from "react"
import {
  Box,
  Card,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from "@mui/material"
import {IOption} from "../types/IOption"
import {useFetchOptionsByQuestionId, useFetchQuestionById} from "../Api/QuestionAPI"
import {IQuestion} from "../types/IQuestion";
import OptionForm from "./OptionForm";

interface IProps {
  questionId: number
  questionNo: number
  initAnswer?: number
  onUserAnswer: (newOptionId: number) => void
}

const QuestionForm: FC<IProps> = ({questionId, questionNo, onUserAnswer, initAnswer = -1}) => {
  const [userAnswer, setUserAnswer] = useState<number>(initAnswer)

  const questionFetch = useFetchQuestionById(questionId)
  const optionsFetch = useFetchOptionsByQuestionId(questionId)

  if (questionFetch.isLoading || optionsFetch.isLoading) return null

  const question = (questionFetch.data as IQuestion).content
  const options = optionsFetch.data as Array<IOption>

  return (
    <Card raised sx={{padding: "40px 20px", borderRadius: "10px"}}>
      <Typography variant="h5" sx={{pl: "10px"}}>
        {question}
      </Typography>
      <Box sx={{mt: "30px", display: "flex", flexWrap: "wrap"}}>
        {
          options.map(option => (
            <Box
              sx={{
                flex: {
                  xs: "100%",
                  md: "50%"
                },
                padding: "10px 10px",
                boxSizing: "border-box",
                flexGrow: "0 !important",
                flexShrink: "0 !important",
              }}
            >
              <OptionForm
                option={option}
                onChoose={(option) => {
                  setUserAnswer(option.id)
                  onUserAnswer(option.id)
                }}
                isChosen={userAnswer === option.id}
              />
            </Box>
          ))
        }
      </Box>
    </Card>
  )
}

export default QuestionForm
