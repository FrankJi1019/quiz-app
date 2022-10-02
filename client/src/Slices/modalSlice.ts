import {createSlice} from "@reduxjs/toolkit";

export enum ModalType {
  NO_MODAL,
  QUIZ_CREATION_FORM,
  THEME_SELECTOR
}

export const showModalSlice = createSlice({
  name: "modal",
  initialState: ModalType.NO_MODAL,
  reducers: {
    hideAllModal: () => ModalType.NO_MODAL,
    showQuizCreatorModal: () => ModalType.QUIZ_CREATION_FORM,
    showThemeSelector: () => ModalType.THEME_SELECTOR,
  }
})

export const {hideAllModal, showQuizCreatorModal, showThemeSelector} = showModalSlice.actions

export default showModalSlice.reducer
