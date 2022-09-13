import React, {FC, useMemo, useState} from "react"
import {
  Box,
  TextField,
  Typography,
  useTheme,
} from "@mui/material"

interface ItemBoxProps {
  content: string
  variant?: "h6" | "h5" | "h4" | "h3" | "h2" | "h1" | "body1"
  onChangeValue: (newValue: string) => void
  multiline?: boolean
  emptyTextPlaceHolder?: string
}

const ModifiableTextView: FC<ItemBoxProps> =
  ({
     content,
     variant = "body1",
     onChangeValue,
     multiline = false,
     emptyTextPlaceHolder,
   }) => {
    const [mode, setMode] = useState<"view" | "edit">("view")
    const [value, setValue] = useState(`${content}`)

    const theme = useTheme()
    const fontSize = useMemo(() => theme.typography[variant].fontSize,
      [theme.typography, variant])
    const fontWeight = useMemo(() => theme.typography[variant].fontWeight,
      [theme.typography, variant])
    const lineHeight = useMemo(() => theme.typography[variant].lineHeight,
      [theme.typography, variant])

    if (mode === "view") {
      return (
        <Box
          sx={{
            cursor: "text",
            padding: "10px",
            borderRadius: "5px",
            "&:hover": {backgroundColor: "#EFEFEF"}
          }}
          onClick={() => {
            setMode("edit")
            setValue(content)
          }}
        >
          {
            content.trim() === "" && emptyTextPlaceHolder ?
              <Typography variant={variant} sx={{color: "#666666"}}>{emptyTextPlaceHolder}</Typography> :
              content.split("\n").map((paragraph) => (
                <Typography variant={variant}>{paragraph}</Typography>
              ))
          }

        </Box>
      )
    } else {
      return (
        <Box
          sx={{position: "relative"}}
          onBlur={() => {
            onChangeValue(value)
            setMode("view")
          }}
        >
          <TextField
            autoFocus
            multiline={multiline}
            size={"medium"}
            sx={{"& input": {fontSize, fontWeight, lineHeight}}}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Box>
      )
    }
  }

export default ModifiableTextView
