import React from "react"
import ReactLoading from "react-loading"
import { useTheme } from "@mui/material"
import Page from "../Containers/Page"

const LoadingPage = () => {
  const theme = useTheme()

  return (
    <Page
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <ReactLoading type="spinningBubbles" color={theme.palette.primary.dark} />
    </Page>
  )
}

export default LoadingPage
