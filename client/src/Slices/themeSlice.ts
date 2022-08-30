import {createSlice} from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'
import {PaletteOptions} from '@mui/material'
import palette1 from "../Themes/palette1";
import {palettes} from "../Themes";
import {useAuth} from "../Providers/AuthProvider";
import {getUserSetting, updateTheme} from "../Api/UserAPI";

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
  }
})

export const {changeTheme} = themeSlice.actions

export default themeSlice.reducer
