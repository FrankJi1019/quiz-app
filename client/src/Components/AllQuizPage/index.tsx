import React, { useEffect, useState } from "react"
import { IQuiz } from "../../../types/IQuiz"
import {getNoneEmptyQuizzesByTopic, getNonEmptyQuizzes} from "../../Api/QuizAPI"
import LoadingPage from "../LoadingPage"
import { useSearchParams } from "react-router-dom"
import AllQuizModePage from "./AllQuizModePage"
import TopicFilterModePage from "./TopicFilterModePage"
import KeywordFilterModePage from "./KeywordFilterModePage"

export interface SubPageProps {
  quizzes: Array<IQuiz>
}

const AllQuizPage = () => {
  const [quizzes, setQuizzes] = useState<Array<IQuiz> | null>(null)

  const [searchParam, setSearchParam] = useSearchParams()

  useEffect(() => {
    const topic = searchParam.get("topic")
    const keyword = searchParam.get("keyword")
    if (topic != null && topic.trim() != "") {
      getNoneEmptyQuizzesByTopic(topic).then((res) => {
        setQuizzes(res.data)
      })
    } else {
      getNonEmptyQuizzes({keyword}).then((res) => {
        setQuizzes(res.data)
      })
    }
  }, [searchParam])

  if (!quizzes) return <LoadingPage />

  if (searchParam.get("topic") != null) {
    return (
      <TopicFilterModePage
        topic={searchParam.get("topic")!}
        quizzes={quizzes}
      />
    )
  } else if (searchParam.get("keyword")) {
    return (
      <KeywordFilterModePage
        keyword={searchParam.get("keyword")!}
        quizzes={quizzes}
      />
    )
  } else {
    return <AllQuizModePage quizzes={quizzes} />
  }
}

export default AllQuizPage
