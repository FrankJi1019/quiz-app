import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { getConfirmPageURL, getLoginPageURL, getSignupPageURL } from "../routes"
import LandingPage from "../Components/LandingPage"
import { Box } from "@mui/material"

const AuthRouter = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh"
      }}
    >
      <Routes>
        <Route
          path={getLoginPageURL()}
          element={<LandingPage mode={"login"} />}
        />
        <Route
          path={getSignupPageURL()}
          element={<LandingPage mode={"signup"} />}
        />
        <Route
          path={getConfirmPageURL()}
          element={<LandingPage mode={"confirm"} />}
        />
        <Route path={"*"} element={<Navigate to={getLoginPageURL()} />} />
      </Routes>
    </Box>
  )
}

export default AuthRouter
