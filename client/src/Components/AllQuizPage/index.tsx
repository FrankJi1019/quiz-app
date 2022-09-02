import React, {useMemo} from "react"
import { IQuiz } from "../../../types/IQuiz"
import {
  useFetchNonEmptyQuizzes,
  useFetchNonEmptyQuizzesByTopic
} from "../../Api/QuizAPI"
import LoadingPage from "../LoadingPage"
import { useSearchParams } from "react-router-dom"
import AllQuizModePage from "./AllQuizModePage"
import TopicFilterModePage from "./TopicFilterModePage"
import KeywordFilterModePage from "./KeywordFilterModePage"

export interface SubPageProps {
  quizzes: Array<IQuiz>
}

const AllQuizPage = () => {

  const [searchParam] = useSearchParams()

  const topic = useMemo(() => searchParam.get("topic"), [searchParam.get("topic")])
  const keyword = useMemo(() => searchParam.get("keyword"), [searchParam.get("keyword")])
  const {data, isLoading} = (topic != null && topic.trim() != "") ?
    useFetchNonEmptyQuizzesByTopic(topic) : useFetchNonEmptyQuizzes(keyword)

  if (isLoading) return <LoadingPage />

  if (searchParam.get("topic") != null) {
    return (
      <TopicFilterModePage
        topic={searchParam.get("topic")!}
        quizzes={data as Array<IQuiz>}
      />
    )
  } else if (searchParam.get("keyword")) {
    return (
      <KeywordFilterModePage
        keyword={searchParam.get("keyword")!}
        quizzes={data as Array<IQuiz>}
      />
    )
  } else {
    return <AllQuizModePage quizzes={data as Array<IQuiz>} />
  }
}

export default AllQuizPage
