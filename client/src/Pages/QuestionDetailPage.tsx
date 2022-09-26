import React, {useEffect, useState} from "react"
import Page from "../Containers/Page"
import {useParams} from "react-router-dom"
import {Box, Button, Grid} from "@mui/material"
import {IQuestion} from "../types/IQuestion"
import {IOption} from "../types/IOption"
import {
  useFetchOptionsByQuestionId,
  useFetchQuestionById,
  useUpdateQuestionMutation
} from "../Api/QuestionAPI"
import LoadingPage from "./LoadingPage"
import ModifiableTextView from "../Components/ModifiableTextView"
import OptionView from "../Components/OptionView";
import {useUpdateOptionMutation} from "../Api/OptionAPI";

const QuestionDetailPage = () => {
  const {questionId} = useParams()

  const [question, setQuestion] = useState<IQuestion | null>()
  const [initQuestion, setInitQuestion] = useState<IQuestion | null>(null)
  const [options, setOptions] = useState<Array<IOption> | null>(null)
  const [initOptions, setInitOptions] = useState<Array<IOption> | null>(null)

  const questionFetch = useFetchQuestionById(Number(questionId))
  const optionsFetch = useFetchOptionsByQuestionId(Number(questionId), true)
  const updateQuestionMutation = useUpdateQuestionMutation()
  const updateOptionMutation = useUpdateOptionMutation()

  useEffect(() => {
    if (questionFetch.isLoading) return
    setQuestion({...questionFetch.data} as IQuestion)
    setInitQuestion({...questionFetch.data} as IQuestion)
  }, [questionFetch.isLoading])

  useEffect(() => {
    if (optionsFetch.isLoading) return
    const data = optionsFetch.data as Array<IOption>
    setOptions(data.map((obj: any) => ({...obj})))
    setInitOptions(data.map((obj: any) => ({...obj})))
  }, [optionsFetch.isLoading])

  if (questionFetch.isLoading || optionsFetch.isLoading || !question || !options) return <LoadingPage/>

  return (
    <Page sx={{padding: {xs: "20px 25px", md: "40px 70px"}}}>
      <Box>
        <ModifiableTextView
          content={question.content}
          variant={"h3"}
          onChangeValue={(content) => setQuestion({...question, content})}
        />
      </Box>
      <Box sx={{mt: "20px"}}>
        <ModifiableTextView
          content={question.explanation}
          onChangeValue={(explanation) =>
            setQuestion({...question, explanation})
          }
          emptyTextPlaceHolder={"The question does not have any explanation"}
          multiline
        />
      </Box>
      <Box sx={{mt: "40px"}}>
        <Grid container sx={{width: "100%"}}>
          {
            options.map((option, index) =>
              <Grid item xs={12} sm={6} md={4} sx={{padding: "10px 10px"}}>
                <OptionView
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
                />
              </Grid>
            )
          }
        </Grid>
      </Box>
      <Box
        sx={{
          mt: "40px",
          display: "flex",
          justifyContent: "right"
        }}
      >
        <Button
          sx={{
            width: {
              xs: "100%",
              md: "auto"
            }
          }}
          onClick={async () => {
            const tasks = []
            tasks.push(updateQuestionMutation.mutateAsync({
              id: Number(questionId), question
            }))
            options && options.forEach(option => {
              tasks.push(updateOptionMutation.mutateAsync({id: option.id, option}))
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
            mt: {
              xs: "10px",
              md: "0"
            },
            ml: {
              xs: "0",
              md: "10px"
            }
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
