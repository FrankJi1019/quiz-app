import {createSlice} from "@reduxjs/toolkit";

export const showSidebarSlice = createSlice({
  name: "showSidebar",
  initialState: true,
  reducers: {
    showSidebar: (state) => state = true,
    hideSidebar: (state) => state = false
  }
})

export const {showSidebar, hideSidebar} = showSidebarSlice.actions

export default showSidebarSlice.reducer
