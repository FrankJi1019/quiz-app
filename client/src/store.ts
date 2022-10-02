import {configureStore} from '@reduxjs/toolkit'
import themeReducer from './Slices/themeSlice'
import showSidebarReducer from "./Slices/showSidebarSlice";
import modalReducer from "./Slices/modalSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    showSidebar: showSidebarReducer,
    modal: modalReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
