import React, {useState} from 'react'
import {Box, Card, Typography, Collapse, IconButton} from "@mui/material";
import {useFetchQuestionResult, useFetchSessionResult} from "../Api/SessionAPI";
import {useParams} from "react-router-dom";
import {useFetchOptionsByQuestionId} from "../Api/QuestionAPI";
import LoadingPage from "./LoadingPage";
import Page from "../Containers/Page";
import {ISession, Result} from "../types/Session";
import {IOption} from "../types/IOption";
import CheckIcon from '@mui/icons-material/Check';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const QuestionResultPage = () => {

  const {sessionId, questionId} = useParams()

  const [showExplanation, setShowExplanation] = useState(false)

  const resultFetch = useFetchQuestionResult(Number(sessionId), Number(questionId))
  const optionsFetch = useFetchOptionsByQuestionId(Number(questionId))

  if (resultFetch.isLoading || optionsFetch.isLoading) return <LoadingPage />

  const result = resultFetch.data as Result
  const options = optionsFetch.data as Array<IOption>

  console.log(result)
  console.log(options)

  // todo display on screen: question content (from session.question.content), all options (from options), explanation (session.question.explanation)
  // todo highlight the one user chose, highlight the correct answer
  return (
    <Page sx={{paddingY: "40px"}}>
      <Box sx={{display: "flex", justifyContent: "center"}}>
        <Card
          raised
          sx={{
            padding: "40px 20px",
            borderRadius: "10px",
            width: "80%",
            height: "auto"
          }}
        >
          <Typography variant="h5" sx={{pl: "10px", mb: "20px"}}>
            {result.question.content}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap"
            }}
          >
            {
              options.map(option => (
                <Box
                  key={option.content}
                  sx={{
                    flex: "50%",
                    padding: "10px 15px",
                    boxSizing: "border-box"
                  }}
                >
                  <Card
                    sx={{
                      borderRadius: "5px",
                      padding: "15px",
                      backgroundColor: option.content == result.correctAnswer ? "#e8f6f0" : "transparent",
                      display: "flex",
                      justifyContent: "space-between"
                    }}
                  >
                    <Box sx={{display: "flex", alignItems: "center"}}>
                      {
                        option.content == result.correctAnswer && (
                          <CheckIcon
                            sx={{
                              color: "success.main",
                              mr: "10px"
                            }}
                          />
                        )
                      }
                      {option.content}
                    </Box>
                    <Box sx={{fontStyle: "italic", color: result.isCorrect ? "success.main" : "error.dark"}}>
                      {result.userAnswer === option.content && "Your choice"}
                    </Box>
                  </Card>
                </Box>
              ))
            }
          </Box>
          <Box
            sx={{
              margin: "40px 20px 0",
              display: result.question.explanation.trim() !== "" ? "block" : "none"
            }}
          >
            <Box
              sx={{
                cursor: "pointer",
                userSelect: "none",
                mb: "15px",
                display: "flex",
                alignItems: "center"
              }}
              onClick={() => setShowExplanation(prevState => !prevState)}
            >
              <IconButton>
                <ExpandMoreIcon
                  sx={{
                    transform: showExplanation ? "rotate(180deg)" : "none",
                    transition: "all .2s",
                    transformOrigin: "center center"
                  }}
                />
              </IconButton>
              <Typography variant="h6">
                {
                  showExplanation ?
                    "Hide explanation" : "Show explanation"
                }
              </Typography>
            </Box>
            <Collapse in={showExplanation}>
              {result.question.explanation}
            </Collapse>
          </Box>
        </Card>
      </Box>
    </Page>
  )
}

export default QuestionResultPage
