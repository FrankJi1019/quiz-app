import React from 'react'
import Page from "../Containers/Page";
import {useAuth} from "../Providers/AuthProvider";
import {useParams, useSearchParams} from "react-router-dom";
import {useFetchFinishedSessionByQuizAndUser, useFetchSessionResult} from "../Api/SessionAPI";
import LoadingPage from "./LoadingPage";
import {ISession, Result} from "../types/Session";
import {Box} from "@mui/material";
import SessionOverview from "../Components/SessionOverview";
import QuestionResultList from "../Components/QuestionResultList";

const PastSessionPage = () => {

  const {getCurrentUser} = useAuth()
  const username = getCurrentUser()!.getUsername()

  const {quizId} = useParams()
  const [searchParam, setSearchParam] = useSearchParams()

  const sessionId = searchParam.get("session")

  const sessionFetch = useFetchFinishedSessionByQuizAndUser(Number(quizId), username)
  const sessionResultFetch = useFetchSessionResult(Number(sessionId))

  if (sessionFetch.isLoading || (sessionResultFetch != null && sessionResultFetch.isLoading)) return <LoadingPage />

  const sessions = sessionFetch.data as Array<ISession>
  const result = sessionResultFetch && sessionResultFetch.data

  return (
    <Page sx={{ padding: { xs: "20px", md: "50px" } }}>
      <Box sx={{pb: "20px", display: "flex"}}>
        {
          sessions.map(s =>
            <Box sx={{pr: "10px"}}>
              <SessionOverview
                session={s}
                shouldHighlight={s.id === Number(sessionId)}
                onClick={session => setSearchParam({session: "" + session.id})}
              />
            </Box>
          )
        }
      </Box>
      <Box>
        {result && <QuestionResultList results={result} />}
      </Box>
    </Page>
  )
}

export default PastSessionPage
