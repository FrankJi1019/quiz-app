import React, {FC} from "react"
import {Box, Button, PaletteOptions} from "@mui/material";

interface ThemePreviewProps {
  palette: PaletteOptions
  setPalette: (palette: PaletteOptions) => void
}

const width = "50px"
const height = "80px"

const ThemePreview: FC<ThemePreviewProps> = ({palette, setPalette}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Box sx={{display: "flex"}}>
        <Box
          sx={{
            width, height,
            backgroundColor: (palette.primary as {main: string}).main
          }}
        />
        <Box
          sx={{
            width, height,
            backgroundColor: (palette.secondary as {main: string}).main
          }}
        />
      </Box>
      <Box sx={{mt: "20px"}}>
        <Button onClick={() => setPalette(palette)}>
          SET
        </Button>
      </Box>
    </Box>
  )
}

export default ThemePreview
