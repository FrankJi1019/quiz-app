import React, { useState } from "react"
import {
  Box,
  Button,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  useTheme
} from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { useFormik } from "formik"
import { useAuth } from "../../Providers/AuthProvider"
import { getConfirmPageURL, getLoginPageURL } from "../../routes"
import { useNavigate } from "react-router-dom"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import {createUser} from "../../Api/UserAPI";

const SignupForm = () => {
  const [error, setError] = useState<string | null | undefined>(null)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { signup } = useAuth()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: ""
    },
    onSubmit: async (values) => {
      setButtonLoading(true)
      const res = await signup(values.username, values.email, values.password)
      if (res === true) {
        createUser(values.username).then(() => {})
        navigate(getConfirmPageURL(), {
          state: {
            username: values.username,
            email: values.email,
            password: values.password
          }
        })
      } else {
        setError(res as string)
      }
      setButtonLoading(false)
    }
  })

  const formElement = Object.keys(formik.values).map((key) => (
    <Box key={key} sx={{ mt: "20px" }}>
      <FormLabel>{key.toUpperCase()}</FormLabel>
      {key.toLowerCase().includes("password") ? (
        <OutlinedInput
          name={key}
          onChange={formik.handleChange}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position={"end"}>
              <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          }
        />
      ) : (
        <TextField name={key} onChange={formik.handleChange} />
      )}
    </Box>
  ))

  return (
    <Box>
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
          <Box sx={{ mt: "20px" }}>
            <LoadingButton
              variant="contained"
              loading={buttonLoading}
              type="submit"
            >
              SIGN UP
            </LoadingButton>
            <Button
              variant="text"
              onClick={() => navigate(getLoginPageURL())}
              sx={{ color: "#000000" }}
            >
              Log In
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default SignupForm
