import React, {createContext, useContext, useMemo} from "react"
import {createTheme, PaletteOptions, ThemeProvider} from "@mui/material";
import baseTheme from "../Themes/baseTheme";
import {changeTheme} from "../Slices/themeSlice";
import type {RootState} from "../store";
import {useSelector, useDispatch} from "react-redux"
import {useAuth} from "./AuthProvider";
import {useFetchUserSetting, useUpdateThemeMutation} from "../Api/UserAPI";
import {palettes} from "../Themes";

interface ThemeData {
  setTheme: (palette: PaletteOptions) => void
  getTheme: () => PaletteOptions
  initialiseTheme: () => void
}

const context = createContext(
  {} as ThemeData
)

// @ts-ignore
const CustomThemeProvider = ({children}) => {

  const palette = useSelector((state: RootState) => state.theme.palette)
  const dispatch = useDispatch()
  const {getCurrentUser} = useAuth()

  const fetchSettingMutation = useFetchUserSetting()
  const updateThemeMutation = useUpdateThemeMutation()

  const theme = useMemo(() =>
    createTheme({
      palette,
      ...baseTheme
    }), [palette])

  const data = {
    setTheme: (palette: PaletteOptions) => {
      if (getCurrentUser() == null) return
      const username = getCurrentUser()!.getUsername()
      dispatch(changeTheme({palette, username}))
      const theme = palettes.findIndex((p) => p == palette)
      // updateTheme(username, paletteNo).then(() => {})
      updateThemeMutation.mutate({username, theme})
    },
    getTheme: () => palette,
    initialiseTheme: () => {
      if (getCurrentUser() == null) return
      const username = getCurrentUser()!.getUsername()
      fetchSettingMutation.mutateAsync(username).then(res => {
        dispatch(changeTheme({palette: palettes[res.theme], username}))
      })
    }
  }

  return (
    <context.Provider value={data}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </context.Provider>
  )
}

export default CustomThemeProvider

export const useCustomTheme = () => useContext(context)
