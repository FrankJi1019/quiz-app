import React, { useState } from "react"
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
  useTheme
} from "@mui/material"
import { useAuth } from "../Providers/AuthProvider"
import { useLocation } from "react-router-dom"
import { useFormik } from "formik"

const ConfirmationForm = () => {
  const [error, setError] = useState<string | null>(null)

  const { confirmUser, login } = useAuth()
  const location = useLocation()
  let state: { username: string; email: string; password: string }

  if (location.state) {
    state = location.state as {
      username: string
      email: string
      password: string
    }
  } else {
    return null
  }

  const formik = useFormik({
    initialValues: {
      code: ""
    },
    onSubmit: async (values) => {
      const res = await confirmUser(state.username, values.code)
      if (res === true) {
        await login(state.username, state.password)
      } else {
        setError(res as string)
      }
    }
  })

  return (
    <Box sx={{ mt: "30px" }}>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ mb: "20px" }}>
            <Typography>Hi {state.username}</Typography>
            <Typography>
              Your confirmation code has been sent to {state.email}
            </Typography>
          </Box>
          <TextField name={"code"} onChange={formik.handleChange} />
          <FormHelperText
            sx={{
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            {error}
          </FormHelperText>
          <Button type="submit" sx={{ mt: "20px" }}>
            Confirm
          </Button>
        </form>
      </Box>
    </Box>
  )
}

export default ConfirmationForm
