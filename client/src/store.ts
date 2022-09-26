import {configureStore} from '@reduxjs/toolkit'
import themeReducer from './Slices/themeSlice'
import showThemeSelectorReducer from "./Slices/showThemeSelectorSlice";
import showSidebarReducer from "./Slices/showSidebarSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    showThemeSelector: showThemeSelectorReducer,
    showSidebar: showSidebarReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
