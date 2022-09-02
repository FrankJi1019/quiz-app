import React, { FC, useMemo } from "react"
import {
  Autocomplete,
  Box,
  Button,
  FormLabel,
  IconButton,
  Modal,
  styled,
  TextField,
  Typography
} from "@mui/material"
import { useFormik } from "formik"
import {ICreateQuizDto} from "../../types/IQuiz"
import {useCreateQuiz, useFetchNonEmptyQuizzes} from "../Api/QuizAPI"
import { getQuizDetailPageURL } from "../routes"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import {useFetchTopics} from "../Api/TopicAPI"
import CloseIcon from "@mui/icons-material/Close"
import { useAuth } from "../Providers/AuthProvider"

interface QuizCreationModalProps {
  open: boolean
  onClose: () => void
}

const InputWrapper = styled(Box)({
  marginTop: "20px"
})

const QuizCreationModal: FC<QuizCreationModalProps> = ({ open, onClose }) => {
  const { getCurrentUser } = useAuth()
  const username = useMemo(
    () => getCurrentUser()!.getUsername(),
    [getCurrentUser]
  )
  const navigate = useNavigate()

  const topicFetch = useFetchTopics()
  const quizCreateQuery = useCreateQuiz()
  const quizFetchQuery = useFetchNonEmptyQuizzes()

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      topicStrings: [] as Array<string>
    } as ICreateQuizDto,
    onSubmit: async (values) => {
      const payload = {
        ...values,
        authorId: username
      }
      const res = await quizCreateQuery.mutateAsync(payload)
      navigate(getQuizDetailPageURL(res.id))
      onClose()
    },
    validationSchema: yup.object({
      name: yup.string().required("Quiz name is required"),
      topicStrings: yup.array()
        .test({
          message: "Quiz must have at least one topic",
          test: (arr) => arr !== undefined && arr.length !== 0
        })
        .test({
          message: "Quiz can have up to three topics",
          test: (arr) => arr !== undefined && arr.length <= 3
        })
    })
  })

  if (topicFetch.isLoading) return null

  const topics = (topicFetch.data as Array<{name: string}>).map(topic => topic.name)

  return (
    <Modal open={open} onClose={() => {}}>
      <Box
        sx={{
          padding: "20px 40px 40px",
          backgroundColor: "white",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: {
            xs: "100%",
            md: "600px"
          },
          height: {
            xs: "100%",
            md: "auto"
          },
          borderRadius: "5px",
          boxSizing: "border-box"
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px"
          }}
        >
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <InputWrapper>
            <Typography
              variant="h3"
              sx={{
                textAlign: "center"
              }}
            >
              Create Quiz
            </Typography>
          </InputWrapper>
          <InputWrapper>
            <FormLabel>Quiz name</FormLabel>
            <TextField
              name="name"
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </InputWrapper>
          <InputWrapper>
            <FormLabel>Description</FormLabel>
            <TextField
              multiline
              rows={3}
              name="description"
              onChange={formik.handleChange}
            />
          </InputWrapper>
          <InputWrapper>
            <FormLabel>Quiz Topics</FormLabel>
            <Autocomplete
              multiple
              freeSolo
              value={formik.values.topicStrings}
              onChange={(event: any, newValue: any | null) => {
                formik.setValues({
                  ...formik.values,
                  topicStrings: newValue.map((value: string) =>
                    (value as string).toLowerCase()
                  )
                })
              }}
              options={topics}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={formik.touched.topicStrings && Boolean(formik.errors.topicStrings)}
                  helperText={formik.touched.topicStrings && formik.errors.topicStrings}
                />
              )}
            />
          </InputWrapper>
          <InputWrapper>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </InputWrapper>
        </form>
      </Box>
    </Modal>
  )
}

export default QuizCreationModal
