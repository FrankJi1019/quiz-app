export const getHomePageURL = () => "/"

export const getAllQuizPageURL = () => "/quiz"

export const getQuizReadyPageURL = (id: string | number = ":quizId") =>
  getAllQuizPageURL() + "/" + id + "/meta"

export const getQuizStartPageURL = (id: string | number = ":quizId") =>
  getAllQuizPageURL() + "/" + id + "/start"

export const getQuizDetailPageURL = (id: string | number = ":quizId") =>
  getAllQuizPageURL() + "/" + id

export const getQuestionDetailPageURL = (
  quizId: string | number = ":quizId",
  questionId: string | number = ":questionId"
) => getQuizDetailPageURL(quizId) + "/questions/" + questionId

export const getCreateQuestionPageURL = (quizId: string | number = ":quizId") =>
  getQuizDetailPageURL(quizId) + "/questions/create"

export const getResultPageURL = () => "/result"

export const getUserQuizPageURL = (username: string = ":username") =>
  "/users/" + username + "/quizzes"

export const getLoginPageURL = () => "/login"
export const getSignupPageURL = () => "/signup"
export const getConfirmPageURL = () => "/confirm"
