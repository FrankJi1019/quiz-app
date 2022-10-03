import React, {FC} from 'react'
import {ModalProps} from "./index";
import {Box, IconButton, Modal, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useSelector} from "react-redux";
import {ModalType} from "../Slices/modalSlice";

const NotificationModal: FC<ModalProps> = ({open, onClose}) => {

  const message = useSelector(
    state => (state as {modal: {modalType: ModalType, message: string}}).modal.message
  )

  return (
    <Modal open={open} onClose={() => {}}>
      <Box
        sx={{
          padding: "20px 40px 40px",
          backgroundColor: "white",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: {
            xs: "100%",
            md: "600px"
          },
          height: {
            xs: "100%",
            md: "200px"
          },
          borderRadius: "5px",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px"
          }}
        >
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{fontSize: "20px"}}>
          {message}
        </Box>
      </Box>
    </Modal>

  )
}

export default NotificationModal
