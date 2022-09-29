import React, {useCallback, useState} from "react"
import Page from "../Containers/Page"
import {
  Box,
  Button,
  Card,
  FormHelperText,
  FormLabel, Grid, IconButton,
  styled, Switch,
  TextField
} from "@mui/material"
import {useFormik} from "formik"
import * as yup from "yup"
import {useUtil} from "../Providers/UtilProvider"
import {useCreateQuestionWithOptions} from "../Api/QuestionAPI"
import {ICreateQuestionWithOptions} from "../types/IQuestion"
import {useNavigate, useParams} from "react-router-dom"
import {getQuizManagingPageURL} from "../routes"
import CreatedOption from "../Components/CreatedOption"
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const InputBox = styled(Box)({
  marginBottom: "20px"
})

const QuestionCreationPage = () => {
  const {forceRerender} = useUtil()
  const {quizId} = useParams()
  const navigate = useNavigate()

  const [option, setOption] = useState("")
  const [addingOption, setAddingOption] = useState(false)
  const [includeExplanation, setIncludeExplanation] = useState(false)

  const createQuestionMutation = useCreateQuestionWithOptions()

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
    onSubmit: async (values) => {
      await createQuestionMutation.mutateAsync(values)
      navigate(getQuizManagingPageURL(Number(quizId)))
    },
    validationSchema: yup.object({
      content: yup.string().required("QuestionForm body is required"),
      options: yup.array().test({
        test: (arr) =>
          arr !== undefined &&
          arr.length >= 2 &&
          arr.filter((option) => option.isCorrect).length === 1,
        message:
          "QuestionForm must contain at least two options and exactly one correct option"
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
    <Page sx={{padding: {xs: "20px", md: "20px 100px"}}}>
      <form onSubmit={formik.handleSubmit}>
        <InputBox>
          <TextField
            name="content"
            onChange={formik.handleChange}
            variant="standard"
            placeholder="Type your question here..."
            error={
              Boolean(formik.touched.content) && Boolean(formik.errors.content)
            }
            InputProps={{
              disableUnderline: true,
            }}
            sx={{
              border: "none",
              "& input": {
                fontWeight: "bold",
                fontSize: {
                  xs: "20px",
                  sm: "25px"
                },
                textAlign: "center"
              }
            }}
          />
          <FormHelperText
            sx={{
              visibility: formik.touched.content && Boolean(formik.errors.content) ? "visible" : "none"
            }}
          >
            {formik.touched.content && formik.errors.content}
          </FormHelperText>
        </InputBox>
        <InputBox>
          <Grid container>
            {
              formik.values.options.map((option) => (
                <Grid item xs={12} sm={6} md={4} sx={{padding: "10px"}}>
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
                    onDelete={() => {
                      formik.setValues({
                        ...formik.values,
                        options: formik.values.options.filter(x => x.content !== option.content)
                      })
                    }}
                  />
                </Grid>
              ))
            }
            {
              addingOption && (
                <Grid item xs={12} sm={6} md={4} sx={{padding: "10px"}}>
                  <Card
                    sx={{
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                      borderRadius: "5px",
                      transition: ".2s",
                      display: "flex",
                      alignItems: "center",
                      padding: "16px 15px",
                      backgroundColor: "#F9F9F9",
                      boxSizing: "border-box"
                    }}
                  >
                    <TextField
                      autoFocus
                      variant="standard"
                      InputProps={{disableUnderline: true}}
                      placeholder="New option"
                      value={option}
                      onChange={(e) => setOption(e.target.value)}
                      error={
                        Boolean(formik.touched.options) &&
                        Boolean(formik.errors.options)
                      }
                      onBlur={() => {
                        addOption()
                        setAddingOption(false)
                      }}
                    />
                  </Card>
                </Grid>
              )
            }
            <Grid item xs={12} sm={6} md={4} sx={{padding: "10px"}}>
              <Box
                onClick={() => setAddingOption(true)}
                sx={{
                  width: "100%",
                  cursor: "pointer",
                  border: "2px dashed #ccc",
                  borderRadius: "5px",
                  transition: ".2s",
                  display: "flex",
                  alignItems: "center",
                  padding: "9px",
                  boxSizing: "border-box",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    borderColor: "primary.dark"
                  }
                }}
              >
                <IconButton>
                  <AddIcon />
                </IconButton>
                <Box>
                  New Option
                </Box>
              </Box>
            </Grid>
          </Grid>
        </InputBox>
        <InputBox>
          <Switch
            value={includeExplanation}
            onChange={(e) => {
              formik.setValues({...formik.values, explanation: ""})
              setIncludeExplanation(e.target.checked)
            }}
          />
          <FormLabel>Add Explanation</FormLabel>
          {
            includeExplanation && (
              <TextField
                focused
                multiline
                rows={3}
                name="explanation"
                onChange={formik.handleChange}
              />
            )
          }
        </InputBox>
        <InputBox sx={{display: "flex", justifyContent: "right"}}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </InputBox>
        <FormHelperText
          sx={{
            display: Boolean(formik.touched.options) && Boolean(formik.errors.options) ? "block" : "none"
          }}
        >
          {
            Boolean(formik.touched.options) && formik.errors.options as string
          }
        </FormHelperText>
      </form>
    </Page>
  )
}

export default QuestionCreationPage
