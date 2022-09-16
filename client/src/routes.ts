export const getHomePageURL = () => "/"

export const getQuizListPageURL = () => "/quiz"

export const getQuizIntroPageURL = (id: string | number = ":quizId") => getQuizListPageURL() + "/" + id + "/intro"

export const getActiveSessionPageURL = (id: string | number = ":sessionId") => "/sessions/" + id

export const getQuizManagingPageURL = (id: string | number = ":quizId") => getQuizListPageURL() + "/" + id

export const getQuestionDetailPageURL = (
  quizId: string | number = ":quizId",
  questionId: string | number = ":questionId"
) => getQuizManagingPageURL(quizId) + "/questions/" + questionId

export const getCreateQuestionPageURL = (quizId: string | number = ":quizId") =>
  getQuizManagingPageURL(quizId) + "/questions/create"

export const getFinishedSessionPageURL = (id: string | number = ":sessionId") => getActiveSessionPageURL(id) + "/result"

export const getUserQuizPageURL = (username: string = ":username") => "/users/" + username + "/quizzes"

export const getAttemptedQuizzesPageURL = (username: string = ":username") => "/users/" + username + "/attempted-quizzes"

export const getPastSessionPageURL = (quizId: string | number = ":quizId") => "/quiz/" + quizId + "/finished-sessions"

export const getLoginPageURL = () => "/login"

export const getSignupPageURL = () => "/signup"

export const getConfirmPageURL = () => "/confirm"
