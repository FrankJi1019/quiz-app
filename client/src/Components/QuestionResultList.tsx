import React, {FC} from "react"
import {Result} from "../types/Session";
import {Box} from "@mui/material";
import QuestionResult from "./QuestionResult";
import {IQuestion} from "../types/IQuestion";

interface QuestionResultListProps {
  results: Array<Result>
  onViewDetail: (question: IQuestion) => void
}

const QuestionResultList: FC<QuestionResultListProps> = ({results, onViewDetail}) => {
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
              onViewDetail={onViewDetail}
            />
          </Box>
        ))
      }
    </Box>
  )
}

export default QuestionResultList
