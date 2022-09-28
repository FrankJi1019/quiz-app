import React, {FC} from "react"
import {Result} from "../types/Session";
import {Box} from "@mui/material";
import QuestionResult from "./QuestionResult";

interface QuestionResultListProps {
  results: Array<Result>
}

const QuestionResultList: FC<QuestionResultListProps> = ({results}) => {
  return (
    <Box>
      {
        results.map((r) => (
          <Box key={r.question.id} sx={{ mb: "40px" }}>
            <QuestionResult
              question={r.question}
              userAnswer={r.userAnswer}
              correctAnswer={r.correctAnswer}
              isCorrect={r.isCorrect}
            />
          </Box>
        ))
      }
    </Box>
  )
}

export default QuestionResultList
