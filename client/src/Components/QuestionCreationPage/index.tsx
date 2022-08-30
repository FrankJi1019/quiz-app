import React, { useCallback, useState } from "react"
import Page from "../../Containers/Page"
import {
  Box,
  Button,
  FormHelperText,
  FormLabel,
  styled,
  TextField,
  Typography,
  useTheme
} from "@mui/material"
import { useFormik } from "formik"
import * as yup from "yup"
import { useUtil } from "../../Providers/UtilProvider"
import { createQuestionWithOptions } from "../../Api/QuestionAPI"
import { ICreateQuestionWithOptions } from "../../../types/IQuestion"
import { useNavigate, useParams } from "react-router-dom"
import { getQuizDetailPageURL } from "../../routes"
import CreatedOption from "./CreatedOption"

const InputBox = styled(Box)({
  marginBottom: "20px"
})

const QuestionCreationPage = () => {
  const { forceRerender } = useUtil()
  const { quizId } = useParams()
  const navigate = useNavigate()
  const theme = useTheme()

  const [option, setOption] = useState("")

  if (!quizId || isNaN(Number(quizId))) return null

  const formik = useFormik({
    initialValues: {
      content: "",
      explanation: "",
      options: [] as Array<{
        content: string
        isCorrect: boolean
        questionId: 0
      }>,
      quizId: Number(quizId)
    } as ICreateQuestionWithOptions,
    onSubmit: (values) => {
      createQuestionWithOptions(values).then(() =>
        navigate(getQuizDetailPageURL(Number(quizId)))
      )
    },
    validationSchema: yup.object({
      content: yup.string().required("Question body is required"),
      options: yup.array().test({
        test: (arr) =>
          arr !== undefined &&
          arr.length >= 2 &&
          arr.filter((option) => option.isCorrect).length === 1,
        message:
          "Question must contain at least two options and exactly one correct option"
      })
    })
  })

  const addOption = useCallback(() => {
    if (
      formik.values.options.map((option) => option.content).includes(option) ||
      option.trim() === ""
    ) {
      setOption("")
      return
    }
    formik.values.options.push({
      content: option,
      isCorrect: false,
      questionId: 0
    })
    setOption("")
  }, [option, formik])

  return (
    <Page sx={{ padding: { xs: "20px", md: "20px 100px" } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: "20px"
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: {
              xs: "25px",
              md: theme.typography.h1.fontSize
            }
          }}
        >
          Create Question
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <InputBox>
          <FormLabel>Question</FormLabel>
          <TextField
            name="content"
            onChange={formik.handleChange}
            error={
              Boolean(formik.touched.content) && Boolean(formik.errors.content)
            }
          />
          <FormHelperText
            sx={{
              visibility:
                formik.touched.content && Boolean(formik.errors.content)
                  ? "visible"
                  : "none"
            }}
          >
            {formik.touched.content && formik.errors.content}
          </FormHelperText>
        </InputBox>
        <InputBox>
          {formik.values.options.map((option) => (
            <CreatedOption
              content={option.content}
              isCorrect={option.isCorrect}
              onToggleCorrect={() => {
                formik.values.options.forEach(
                  (option) => (option.isCorrect = false)
                )
                option.isCorrect = true
                forceRerender()
              }}
            />
          ))}
          <Box>
            <Box sx={{ display: "flex" }}>
              <TextField
                fullWidth={false}
                placeholder={"Option " + (formik.values.options.length + 1)}
                value={option}
                onChange={(e) => setOption(e.target.value)}
                error={
                  Boolean(formik.touched.options) &&
                  Boolean(formik.errors.options)
                }
                sx={{ flex: 1 }}
              />
              <Button variant="contained" onClick={addOption}>
                Add option
              </Button>
            </Box>
            <FormHelperText
              sx={{
                visibility:
                  formik.touched.options && Boolean(formik.errors.options)
                    ? "visible"
                    : "none"
              }}
            >
              {(formik.touched.options && formik.errors.options) as string}
            </FormHelperText>
          </Box>
        </InputBox>
        <InputBox>
          <FormLabel>Explanation</FormLabel>
          <TextField
            multiline
            rows={3}
            name="explanation"
            onChange={formik.handleChange}
          />
        </InputBox>
        <InputBox>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </InputBox>
      </form>
    </Page>
  )
}

export default QuestionCreationPage
