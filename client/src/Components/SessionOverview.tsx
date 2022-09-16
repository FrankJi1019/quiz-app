import React, {FC} from 'react'
import {ISession} from "../types/Session";
import {Box, useTheme} from "@mui/material";
import moment from "moment";

interface SessionOverviewProps {
  session: ISession
  onClick: (session: ISession) => void
  shouldHighlight: boolean
}

const SessionOverview: FC<SessionOverviewProps> = ({session, onClick, shouldHighlight}) => {

  const theme = useTheme()

  return (
    <Box
      sx={{
        padding: {
          xs: "8px 8px",
          md: "8px 15px"
        },
        textAlign: "center",
        borderRadius: "100px",
        cursor: "pointer",
        backgroundColor: shouldHighlight ? theme.palette.primary.dark : theme.palette.grey["200"],
        color: shouldHighlight ? theme.palette.grey["200"] : "black",
        "&:hover": {
          backgroundColor: theme.palette.primary.light
        }
      }}
      onClick={() => onClick(session)}
    >
      {moment(session.startedAt).format("YYYY-MM-DD HH:SS")}
    </Box>
  )
}

export default SessionOverview
