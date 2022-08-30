import React, { FC } from "react"
import { IconButton } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useNavigate } from "react-router-dom"

interface IProps {
  url: string
}

const BackButton: FC<IProps> = ({ url }) => {
  const navigate = useNavigate()

  return (
    <IconButton onClick={() => navigate(url)}>
      <ArrowBackIcon />
    </IconButton>
  )
}

export default BackButton
