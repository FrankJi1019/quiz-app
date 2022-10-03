import React from 'react'
import ThemeSelectorModal from "./ThemeSelectorModal";
import {hideAllModal, ModalType} from "../Slices/modalSlice";
import QuizCreationModal from "./QuizCreationModal";
import {useDispatch, useSelector} from "react-redux";
import NotificationModal from "./NotificationModal";

export interface ModalProps {
  open: boolean
  onClose: () => void
}

const Modals = () => {

  const dispatch = useDispatch()
  const modalType = useSelector(state => (state as {modal: {modalType: ModalType}}).modal.modalType)

  return (
    <>
      <ThemeSelectorModal
        open={modalType === ModalType.THEME_SELECTOR}
        onClose={() => dispatch(hideAllModal())}
      />
      <QuizCreationModal
        open={modalType === ModalType.QUIZ_CREATION_FORM}
        onClose={() => dispatch(hideAllModal())}
      />
      <NotificationModal
        open={modalType === ModalType.NOTIFICATION}
        onClose={() => dispatch(hideAllModal())}
      />
    </>
  )
}

export default Modals
