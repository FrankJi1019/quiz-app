import React, { FC, useState } from "react"
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

interface IProps {
  questionId: number
  questionNo: number
  initAnswer?: number
  onUserAnswer: (newOptionId: number) => void
}

const QuestionForm: FC<IProps> = ({ questionId, questionNo, onUserAnswer, initAnswer = -1 }) => {
  const [userAnswer, setUserAnswer] = useState<number>(initAnswer)

  const questionFetch = useFetchQuestionById(questionId)
  const optionsFetch = useFetchOptionsByQuestionId(questionId)

  if (questionFetch.isLoading || optionsFetch.isLoading) return null

  const question = (questionFetch.data as IQuestion).content
  const options = optionsFetch.data as Array<IOption>

  return (
    <Card sx={{ padding: "20px" }} raised>
      <Typography sx={{ fontWeight: "800" }}>
        {`(${questionNo + 1}) ${question}`}
      </Typography>
      <Box>
        <RadioGroup
          onChange={(e) => {
            setUserAnswer(Number(e.target.value))
            onUserAnswer(Number(e.target.value))
          }}
          value={userAnswer}
        >
          {options.map((option) => (
            <FormControlLabel
              key={option.content}
              value={option.id}
              label={option.content}
              control={<Radio color="primary" />}
            />
          ))}
        </RadioGroup>
      </Box>
    </Card>
  )
}

export default QuestionForm
