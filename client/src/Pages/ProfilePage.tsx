import React, {ReactNode, useMemo} from 'react'
import Page from "../Containers/Page";
import {Box, Button, Slide, styled, Typography, useTheme} from "@mui/material";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useFetchAttemptedQuizzes, useFetchUserMetadata, useFetchUserQuizzes} from "../Api/UserAPI";
import {useDeleteQuiz} from "../Api/QuizAPI";
import {IQuiz} from "../types/IQuiz";
import QuizList from "../Components/QuizList";
import {getLoginPageURL, getPastSessionPageURL, getQuizManagingPageURL} from "../routes";
import {useAuth} from "../Providers/AuthProvider";
import {useDispatch} from "react-redux";
import {resetTheme} from "../Slices/themeSlice";
import LoadingPage from "./LoadingPage";
import {IUser} from "../types/User";
import {showQuizCreatorModal} from "../Slices/modalSlice";
import {showThemeSelector} from "../Slices/modalSlice";

interface SubNavBarProps {
  text: string
  onClick: (text: string) => void
}

const InlineHighlight = styled(Box)({
  display: "inline",
  fontWeight: "bold",
  "&::before": {content: '" "'},
  "&::after": {content: '" "'}
})

const getUserCreatedQuizBlock = (
  quizzes: Array<IQuiz>,
  onQuizClick: (quiz: IQuiz) => void,
  onQuizDelete: (quiz: IQuiz) => void,
  onCreateNew: () => void
) => (
  <Box>
    <Box
      sx={{
        paddingX: "15px",
        mb: "20px",
        display: "flex",
        justifyContent: "flex-end"
      }}
    >
      <Button
        onClick={onCreateNew}
      >
        Create New Quiz
      </Button>
    </Box>
    <Box sx={{overflow: "hidden"}}>
      <Slide in direction="down">
        <Box>
          <QuizList
            quizzes={quizzes}
            onQuizClick={onQuizClick}
            onQuizDelete={onQuizDelete}
          />
        </Box>
      </Slide>
    </Box>
  </Box>
)

const getUserTriedQuizBlock = (
  quizzes: Array<IQuiz>,
  onClick: (quiz: IQuiz) => void
) => (
  <Box sx={{overflow: "hidden"}}>
    <Slide in direction="down">
      <Box>
        <QuizList
          quizzes={quizzes}
          onQuizClick={onClick}
        />
      </Box>
    </Slide>
  </Box>
)

const getProfileBlock = (
  username: string,
  onChangeTheme: () => void,
  onLogout: () => void,
  infoBlock: ReactNode
) => (
  <Box
    sx={{
      width: "100%",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <Box
        sx={{
          fontSize: "60px",
          width: "100px",
          height: "100px",
          borderRadius: "10000px",
          boxShadow: "0 0 4px 4px rgba(0,0,0,.3)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {username.toUpperCase()[0]}
      </Box>
      <Box sx={{mt: "20px"}}>
        <Typography variant="h4">
          {username}
        </Typography>
      </Box>
    </Box>
    <Box
      sx={{
        mt: "20px",
        display: "flex",
        justifyContent: {
          xs: "space-between",
          sm: "flex-start"
        },
        "& button": {
          flex: {
            xs: "40%",
            sm: "none"
          }
        }
      }}
    >
      <Button onClick={() => onChangeTheme()} sx={{mr: "10px"}}>
        Change Theme
      </Button>
      <Button variant="outlined" onClick={() => onLogout()} sx={{ml: "10px"}}>
        Logout
      </Button>
    </Box>
    <Box sx={{mt: "20px"}}>
      {infoBlock}
    </Box>
  </Box>
)

const ProfilePage = () => {

  const theme = useTheme()
  const [searchParams, setSearchParams] = useSearchParams()
  const { username } = useParams()
  const { getCurrentUser, logout } = useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentUser = getCurrentUser() ? getCurrentUser()!.getUsername() : ""

  const userCreatedQuizzesFetch = useFetchUserQuizzes(username as string)
  const attemptedQuizzesFetch = useFetchAttemptedQuizzes(username as string)
  const deleteQuizMutation = useDeleteQuiz()
  const userFetch = useFetchUserMetadata(username as string)

  const userCreatedQuizzes = userCreatedQuizzesFetch.data as Array<IQuiz>
  const userTriedQuizzes = attemptedQuizzesFetch.data as Array<IQuiz>

  const subNavBarOptions = useMemo(() => [
    {
      text: "Profile",
      onClick: (option: string) => setSearchParams({option})
    },
    {
      text: "I created",
      onClick: (option: string) => setSearchParams({option})
    },
    {
      text: "I tried",
      onClick: (option: string) => setSearchParams({option})
    }
  ] as Array<SubNavBarProps>, [])

  searchParams.get("option") || setSearchParams({option: subNavBarOptions[0].text})

  if (userFetch.isLoading || userCreatedQuizzesFetch.isLoading || attemptedQuizzesFetch.isLoading)
    return <LoadingPage />

  const userMetadata = userFetch.data as IUser
  const createdQuizzes = userCreatedQuizzesFetch.data as Array<IQuiz>
  const attemptedQuizzes = attemptedQuizzesFetch.data as Array<IQuiz>

  return (
    <Page
      showHeader={false}
      sx={{
        padding: {
          xs: "20px",
          sm: "35px",
          md: "50px 70px"
        }
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          borderBottom: "2px solid #ccc",
          boxSizing: "border-box",
          justifyContent: {
            xs: "space-around",
            md: "flex-start"
          }
        }}
      >
        {
          subNavBarOptions.map(({text, onClick}) => (
            <Box
              onClick={() => onClick(text)}
              sx={{
                marginX: {
                  xs: "5px",
                  md: "10px"
                },
                paddingX: {
                  xs: "5px",
                  md: "20px"
                },
                fontSize: {
                  xs: theme.typography.h6.fontSize,
                  md: theme.typography.h5.fontSize
                },
                cursor: "pointer",
                color: searchParams.get("option") === text ? "primary.dark" : "grey.A700",
                fontWeight: "bold",
                userSelect: "none",
                "&:hover": {
                  color: "primary.dark",
                }
              }}
            >
              {text}
            </Box>
          ))
        }
      </Box>
      {
        searchParams.get("option") === "Profile" && (
          <Box sx={{mt: "30px"}}>
            {
              getProfileBlock(
                currentUser,
                () => dispatch(showThemeSelector()),
                () => {
                  logout()
                  dispatch(resetTheme())
                  navigate(getLoginPageURL())
                },
                <Box
                  sx={{
                    fontSize: {
                      xs: "16px",
                      md: "18px"
                    },
                    color: ""
                  }}
                >
                  <Box>
                    You have joined the community for
                    <InlineHighlight>
                      {Math.round((new Date().getTime() - new Date(userMetadata.createdAt).getTime()) / 1000 / 60 / 60 / 24)}
                    </InlineHighlight>
                    days
                  </Box>
                  <Box sx={{mt: "10px"}}>
                    You have created <InlineHighlight>{createdQuizzes.length}</InlineHighlight> quizzes
                  </Box>
                  <Box sx={{mt: "10px"}}>
                    You have tried <InlineHighlight>{attemptedQuizzes.length}</InlineHighlight> quizzes
                  </Box>
                </Box>
              )
            }
          </Box>
        )
      }
      {
        searchParams.get("option") === "I created" && (
          <Box sx={{mt: "30px"}}>
            {
              getUserCreatedQuizBlock(
                userCreatedQuizzes ? userCreatedQuizzes : [],
                (quiz) => navigate(getQuizManagingPageURL(quiz.id)),
                (quiz) => deleteQuizMutation.mutateAsync(quiz.id).then(() => userCreatedQuizzesFetch.refetch()),
                () => dispatch(showQuizCreatorModal())
              )
            }
          </Box>
        )
      }
      {
        searchParams.get("option") === "I tried" && (
          <Box sx={{mt: "30px"}}>
            {
              getUserTriedQuizBlock(
                userTriedQuizzes ? userTriedQuizzes.map(quiz => ({...quiz, sessionCount: 0})) : [],
                (quiz: IQuiz) => navigate(getPastSessionPageURL(quiz.id))
              )
            }
          </Box>
        )
      }
    </Page>
  )
}

export default ProfilePage
