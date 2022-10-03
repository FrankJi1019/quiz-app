import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum ModalType {
  NO_MODAL,
  QUIZ_CREATION_FORM,
  THEME_SELECTOR,
  NOTIFICATION
}

export const showModalSlice = createSlice({
  name: "modal",
  initialState: {
    modalType: ModalType.NO_MODAL,
    message: ""
  },
  reducers: {
    hideAllModal: (state) => ({
      ...state,
      modalType: ModalType.NO_MODAL
    }),
    showQuizCreatorModal: (state) => ({
      ...state,
      modalType: ModalType.QUIZ_CREATION_FORM
    }),
    showThemeSelector: (state) => ({
      ...state,
      modalType: ModalType.THEME_SELECTOR
    }),
    showNotification: (state, action: PayloadAction<any>) => ({
      ...state,
      modalType: ModalType.NOTIFICATION,
      message: action.payload
    })
  }
})

export const {hideAllModal, showQuizCreatorModal, showThemeSelector, showNotification} = showModalSlice.actions

export default showModalSlice.reducer
