import axios from "axios"
import { constants } from "../constants"
import {useMutation, useQuery, UseQueryResult} from "react-query";
import {ISession, Record, Result, SessionState} from "../types/Session";

export const useFetchActiveSessionByQuizAndUser =
  (quizId: number, username: string): UseQueryResult<Array<ISession>> => {
    return useQuery(["get-session", quizId, username], async () => {
      const {data} = await axios.get(`${constants.general.backend}/sessions`, {
        params: {
          username, quizId, state: SessionState.ACTIVE
        }
      })
      return data
    })
  }

export const useFetchFinishedSessionByQuizAndUser =
  (quizId: number, username: string): UseQueryResult<Array<ISession>> => {
    return useQuery(["get-session", quizId, username], async () => {
      const {data} = await axios.get(`${constants.general.backend}/sessions`, {
        params: {
          username, quizId, state: SessionState.FINISHED
        }
      })
      return data
    })
  }

export const useCreateSessionMutation = () => {
  return useMutation(async (data: {quizId: number, username: string}) => {
    const {data: response} = await axios.post(`${constants.general.backend}/sessions`, data)
    return response
  })
}

export const useFetchSessionById = (id: number): UseQueryResult<ISession> => {
  return useQuery(["get-session-by-id", id], async () => {
    const {data} = await axios.get(`${constants.general.backend}/sessions/${id}`)
    return data
  })
}

export const useFetchSessionRecord = (id: number): UseQueryResult<Array<Record>> => {
  return useQuery(["get-session-record", id], async () => {
    const {data} = await axios.get(`${constants.general.backend}/sessions/${id}/detailed-record`)
    return data
  })
}

export const useFetchSessionResult = (id: number): UseQueryResult<Array<Result>> => {
  return useQuery(["get-session-result", id], async () => {
    if (isNaN(id) || id === 0) return null
    const {data} = await axios.get(`${constants.general.backend}/sessions/${id}/check-answer`)
    return data
  })
}

export const useFetchSession = (id: number): UseQueryResult<ISession> => {
  return useQuery(["get-session-entity", id], async () => {
    const {data} = await axios.get(`${constants.general.backend}/sessions/${id}`)
    return data
  })
}

export const useFetchQuestionResult = (sessionId: number, questionId: number): UseQueryResult<Result> => {
  return useQuery(["get-question-result", sessionId, questionId], async () => {
    const {data} = await axios.get(`${constants.general.backend}/sessions/${sessionId}/questions/${questionId}/check-answer`)
    return data
  })
}
