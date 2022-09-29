import React from 'react'
import Page from "../Containers/Page";
import {useAuth} from "../Providers/AuthProvider";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useFetchFinishedSessionByQuizAndUser, useFetchSessionResult} from "../Api/SessionAPI";
import LoadingPage from "./LoadingPage";
import {ISession} from "../types/Session";
import {Box} from "@mui/material";
import SessionOverview from "../Components/SessionOverview";
import QuestionResultList from "../Components/QuestionResultList";
import {getQuestionResultPageURL} from "../routes";

const PastSessionPage = () => {

  const {getCurrentUser} = useAuth()
  const username = getCurrentUser()!.getUsername()
  const navigate = useNavigate()

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
      <Box sx={{pb: "20px", display: "flex", flexWrap: "wrap"}}>
        {
          sessions.map(s =>
            <Box sx={{pr: "10px", pt: "5px"}}>
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
        {result && (
          <QuestionResultList
            results={result}
            onViewDetail={(question) => navigate(getQuestionResultPageURL(Number(sessionId), question.id))}
          />
        )}
      </Box>
    </Page>
  )
}

export default PastSessionPage
