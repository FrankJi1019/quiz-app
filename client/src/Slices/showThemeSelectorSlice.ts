import {createSlice} from "@reduxjs/toolkit";

export const showThemeSelectorSlice = createSlice({
  name: "showThemeSelector",
  initialState: false,
  reducers: {
    hideModal: (state) => state = false,
    showModal: (state) => state = true
  }
})

export const {hideModal, showModal} = showThemeSelectorSlice.actions

export default showThemeSelectorSlice.reducer
