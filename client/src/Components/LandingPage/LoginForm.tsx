import React, { useState } from "react"
import {
  Box,
  Button,
  FormHelperText,
  FormLabel,
  TextField,
} from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import { getSignupPageURL } from "../../routes"
import { useAuth } from "../../Providers/AuthProvider"

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null)
  const [buttonLoading, setButtonLoading] = useState(false)

  const navigate = useNavigate()
  const { login } = useAuth()

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    onSubmit: async (values) => {
      setButtonLoading(true)
      const res = await login(values.username, values.password)
      if (res !== true) setError(res as string)
      setButtonLoading(false)
    }
  })

  const formElement = Object.keys(formik.values).map((key) => (
    <Box key={key} sx={{ mt: "30px" }}>
      <FormLabel>{key.toUpperCase()}</FormLabel>
      <TextField
        name={key}
        onChange={formik.handleChange}
        type={key.toLowerCase().includes("password") ? "password" : "text"}
      />
    </Box>
  ))

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        {formElement}
        <FormHelperText
          sx={{
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          {error}
        </FormHelperText>
        <Box
          sx={{
            display: "flex",
            mt: "30px"
          }}
        >
          <LoadingButton
            variant="contained"
            type="submit"
            loading={buttonLoading}
          >
            Log In
          </LoadingButton>
          <Button
            variant="text"
            onClick={() => navigate(getSignupPageURL())}
            sx={{ color: "#000000" }}
          >
            Sign Up
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default LoginForm
