import React, {useEffect, useState} from "react"
import Page from "../../Containers/Page"
import {useParams} from "react-router-dom"
import {Box, Button} from "@mui/material"
import {IQuestion} from "../../../types/IQuestion"
import {IOption} from "../../../types/IOption"
import {
  getOptionsByQuestionId,
  getQuestion,
  updateQuestion
} from "../../Api/QuestionAPI"
import LoadingPage from "../LoadingPage"
import ItemBox from "./ItemBox"
import Option from "./Option";
import {updateOption} from "../../Api/OptionAPI";

const QuestionDetailPage = () => {
  const {questionId} = useParams()

  const [question, setQuestion] = useState<IQuestion | null>(null)
  const [initQuestion, setInitQuestion] = useState<IQuestion | null>(null)
  const [options, setOptions] = useState<Array<IOption> | null>(null)
  const [initOptions, setInitOptions] = useState<Array<IOption> | null>(null)

  if (!questionId || isNaN(Number(questionId))) return null

  useEffect(() => {
    getQuestion(Number(questionId)).then((res) => {
      setQuestion(res.data)
      setInitQuestion(res.data)
    })
  }, [questionId])

  useEffect(() => {
    getOptionsByQuestionId(Number(questionId), true).then((res) => {
      setOptions(res.data.map((obj: any) => ({...obj})))
      setInitOptions(res.data.map((obj: any) => ({...obj})))
    })
  }, [questionId])

  if (!question || !options) return <LoadingPage/>

  return (
    <Page sx={{padding: {xs: "20px 25px", md: "40px 70px"}}}>
      <Box>
        <ItemBox
          content={question.content}
          variant={"h3"}
          onChangeValue={(content) => setQuestion({...question, content})}
        />
      </Box>
      <Box sx={{mt: "20px"}}>
        <ItemBox
          content={question.explanation}
          onChangeValue={(explanation) =>
            setQuestion({...question, explanation})
          }
          emptyTextPlaceHolder={"The question does not have any explanation"}
          multiline
        />
      </Box>
      <Box sx={{mt: "40px"}}>
        {options.map((option, index) =>
          <Option
            key={option.id}
            option={option}
            onChangeContent={(newValue) => {
              const newState = [...options]
              newState[index].content = newValue
              setOptions(newState)
            }}
            onSetToCorrect={() => {
              setOptions(prevState => {
                if (!prevState) return prevState
                const newState = [...prevState]
                newState.forEach(option => option.isCorrect = false)
                newState[index].isCorrect = true
                return newState
              })
            }}
          />)
        }
      </Box>
      <Box sx={{mt: "20px"}}>
        <Button
          sx={{
            width: {
              xs: "100%",
              md: "auto"
            }
          }}
          onClick={async () => {
            const tasks = []
            tasks.push(updateQuestion(Number(questionId), question))
            options && options.forEach(option => {
              tasks.push(updateOption(option.id, option))
            })
            Promise.all(tasks).then(() => window.location.reload())
          }}
        >
          Save Changes
        </Button>
        <Button
          sx={{
            width: {
              xs: "100%",
              md: "auto",
            },
            mt: "10px"
          }}
          variant="outlined"
          onClick={() => {
            setQuestion({...initQuestion} as IQuestion)
            setOptions((initOptions as Array<IOption>).map(option => ({...option})))
          }}
        >
          Discard Changes
        </Button>
      </Box>
    </Page>
  )
}

export default QuestionDetailPage
