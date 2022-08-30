import React, { FC, useEffect, useState } from "react"
import {
  Box,
  Card,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from "@mui/material"
import { IOptionWithoutAnswer } from "../../../types/IOption"
import { getOptionsByQuestionId, getQuestion } from "../../Api/QuestionAPI"

interface IProps {
  questionId: number
  questionNo: number
  onUserAnswer: (e: any) => void
}

const Question: FC<IProps> = ({ questionId, questionNo, onUserAnswer }) => {
  const [question, setQuestion] = useState("")
  const [options, setOptions] = useState<Array<IOptionWithoutAnswer>>([])
  const [userAnswer, setUserAnswer] = useState<number>(-1)

  useEffect(() => {
    getQuestion(questionId).then((res) => {
      setQuestion(res.data.content)
    })
  }, [questionId])

  useEffect(() => {
    getOptionsByQuestionId(questionId).then((res) => {
      setOptions(res.data)
    })
  }, [questionId])

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

export default Question
