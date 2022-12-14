import {createSlice} from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'
import {PaletteOptions} from '@mui/material'
import palette1 from "../Themes/palette1";
import {palettes} from "../Themes";

export interface ThemeState {
  palette: PaletteOptions
}

const initialState: ThemeState = {
  palette: palette1
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<{palette: PaletteOptions, username: string}>) => {
      state.palette = action.payload.palette
    },
    resetTheme: (state) => {
      state.palette = palettes[0]
    }
  }
})

export const {changeTheme, resetTheme} = themeSlice.actions

export default themeSlice.reducer
