import React, {FC} from 'react'
import {Box, Card} from "@mui/material";
import {IOption} from "../types/IOption";

interface OptionFormProps {
  option: IOption
  onChoose: (option: IOption) => void
  isChosen: boolean
}

const OptionForm: FC<OptionFormProps> = ({option, onChoose, isChosen}) => {
  return (
    <Card
      onClick={() => onChoose(option)}
      sx={{
        borderRadius: "5px",
        padding: "15px",
        cursor: "pointer",
        backgroundColor: isChosen ? "primary.light" : "transparent",
        "&:hover": {
          backgroundColor: isChosen ? "primary.light" : "#00000010"
        }
      }}
    >
      {option.content}
    </Card>
  )
}

export default OptionForm
