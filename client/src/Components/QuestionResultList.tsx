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
          <Box key={r.questionId} sx={{ mb: "20px" }}>
            <QuestionResult
              question={r.questionContent}
              userAnswer={r.userAnswer}
              correctAnswer={r.correctAnswer}
            />
          </Box>
        ))
      }
    </Box>
  )
}

export default QuestionResultList
