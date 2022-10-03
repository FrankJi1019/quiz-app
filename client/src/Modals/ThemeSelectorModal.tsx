import React, {FC} from "react"
import {Box, IconButton, Modal, Typography} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close";
import {useCustomTheme} from "../Providers/CustomThemeProvider";
import {palettes} from "../Themes";
import ThemePreview from "../Components/ThemePreview";
import {ModalProps} from "./index";


const QuizCreationModal: FC<ModalProps> = ({open, onClose}) => {

  const {setTheme} = useCustomTheme()

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
            md: "auto"
          },
          borderRadius: "5px",
          boxSizing: "border-box"
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
        <Box sx={{mb: "20px"}}>
          <Typography variant="h3">
            Choose Your Theme
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex"
          }}
        >
          {
            palettes.map(palette => (
              <Box sx={{marginX: "10px"}}>
                <ThemePreview
                  palette={palette}
                  onPaletteChange={setTheme}
                />
              </Box>
            ))
          }
        </Box>
      </Box>
    </Modal>
  )
}

export default QuizCreationModal
