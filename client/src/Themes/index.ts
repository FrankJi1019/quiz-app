import {createTheme} from "@mui/material";
import palette1 from "./palette1";
import palette2 from "./palette2"
import palette3 from "./palette3"
import baseTheme from "./baseTheme";

const theme = createTheme({
  palette: palette1,
  ...baseTheme
})

export default theme

export const palettes = [palette1, palette2, palette3]
