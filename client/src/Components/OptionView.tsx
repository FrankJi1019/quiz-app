import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {Box, Card} from "@mui/material";
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
        color: option.isCorrect ? "green" : "auto",
        margin: "20px 0",
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
        <CheckCircleIcon
          sx={{
            display: option.isCorrect ? "block" : "none",
            mr: "10px"
          }}
        />
        <Box sx={{flex: 1, mr: "20px"}}>
          <ModifiableTextView content={option.content} onChangeValue={onChangeContent} />
        </Box>
      </Box>
      <Box
        onClick={onSetToCorrect}
        sx={{
          cursor: "pointer",
          fontSize: {
            xs: "14px",
            md: "16px"
          },
          "&:hover": {
            textDecoration: "underline"
          }
        }}
      >
        Set as correct
      </Box>
    </Card>
  )
}

export default OptionView
