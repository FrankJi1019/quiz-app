import {configureStore} from '@reduxjs/toolkit'
import themeReducer from './Slices/themeSlice'
import showThemeSelectorReducer from "./Slices/showThemeSelectorSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    showThemeSelector: showThemeSelectorReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
