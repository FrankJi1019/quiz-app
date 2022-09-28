import React, {FC} from "react"
import {Box, Button, PaletteOptions} from "@mui/material";

interface ThemePreviewProps {
  palette: PaletteOptions
  onPaletteChange: (palette: PaletteOptions) => void
}

const width = "80px"
const height = "80px"

const ThemePreview: FC<ThemePreviewProps> = ({palette, onPaletteChange}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Box sx={{mt: "20px"}}>
        <Button
          onClick={() => onPaletteChange(palette)}
          sx={{
            backgroundColor: (palette.primary as {main: string}).main,
            "&:hover": {
              backgroundColor: (palette.primary as {dark: string}).dark
            }
          }}
        >
          SET
        </Button>
      </Box>
    </Box>
  )
}

export default ThemePreview
