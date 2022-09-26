import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {Box, Card, IconButton} from "@mui/material";
import React, {FC} from "react";
import {IOption} from "../types/IOption";
import ModifiableTextView from "./ModifiableTextView";

interface OptionProps {
  option: IOption
  onChangeContent: (newValue: string) => void
  onSetToCorrect: () => void
}

const OptionView: FC<OptionProps> = ({option, onChangeContent, onSetToCorrect}) => {
  return (
    <Card
      sx={{
        color: option.isCorrect ? "green" : "grey.A700",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        overflow: "visible",
        backgroundColor: "#F9F9F9"
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flex: "1"
        }}
      >
        <IconButton sx={{color: option.isCorrect ? "green" : "grey.A700"}}>
          <CheckCircleIcon onClick={onSetToCorrect} />
        </IconButton>
        <Box sx={{flex: 1, mr: "20px"}}>
          <ModifiableTextView content={option.content} onChangeValue={onChangeContent} />
        </Box>
      </Box>
    </Card>
  )
}

export default OptionView
