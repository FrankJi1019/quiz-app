import {Box, Menu, MenuItem, styled, SxProps, Button, IconButton} from "@mui/material"
import React, {FC, ReactNode, useCallback, useMemo, useState} from "react";
import {useAuth} from "../Providers/AuthProvider";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useDispatch} from "react-redux";
import {showThemeSelector} from "../Slices/modalSlice";
import {useNavigate} from "react-router-dom";
import {getProfilePageURL} from "../routes";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

interface PageProps {
  sx?: SxProps
  children: ReactNode
  showHeader?: boolean
}

const ProfileAvatar = styled(Box)({
  backgroundColor: "#FFFFFF",
  width: "40px",
  height: "40px",
  borderRadius: "1000px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 0 4px 4px rgba(0, 0, 0, .3)"
})

const Page: FC<PageProps> = ({
  sx,
  children,
  showHeader = true
}) => {

  const dispatch = useDispatch()
  const { getCurrentUser, logout } = useAuth()
  const navigate = useNavigate()

  const goBack = useCallback(() => {
    window.history.back()
  }, [])

  const username = useMemo(
    () => {
      const user = getCurrentUser()
      if (user) {
        return user.getUsername()
      } else {
        return null
      }
    },
    [getCurrentUser]
  )

  const [menuAnchor, setMenuAnchor] = useState(null)

  const menuItems = [
    {
      text: "Profile",
      onClick: () => navigate(getProfilePageURL(username as string))
    },
    {
      text: "Change Theme",
      onClick: () => dispatch(showThemeSelector())
    },
    {
      text: "Logout",
      onClick: () => logout()
    }
  ] as Array<{text: string, onClick: () => void}>

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        overflowX: 'hidden'
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: 'center',
          padding: {
            xs: "10px",
            md: '10px 50px 10px'
          },
          justifyContent: {
            xs: "flex-start",
            md: 'space-between'
          },
        }}
      >
        <Box>
          <Button
            variant={'outlined'}
            sx={{display: {xs: "none", md: "flex"}}}
            startIcon={<ChevronLeftIcon/>}
            onClick={goBack}
          >
            Back
          </Button>
          <IconButton onClick={goBack} sx={{display: {xs: "block", md: "none"}}}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: {
              xs: 'none',
              md: showHeader ? "flex" : "none"
            },
            alignItems: "center"
          }}
        >
          <ProfileAvatar>
            {username && username.toUpperCase()[0]}
          </ProfileAvatar>
          <Box
            onMouseEnter={(e) => setMenuAnchor(e.currentTarget as any)}
            onMouseLeave={() => setMenuAnchor(null)}
            sx={{
              ml: '10px',
              fontSize: "22px",
              display: 'flex'
            }}
          >
            <Box>
              {username}
            </Box>
            <Box
              sx={{
                transition: 'all .2s',
                transformOrigin: "center center",
                transform: Boolean(menuAnchor) ? "rotate(180deg)" : "none",
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <ExpandMoreIcon sx={{fontSize: '30px'}} />
            </Box>
            <Box>
              <Menu
                autoFocus={false}
                open={Boolean(menuAnchor)}
                anchorEl={menuAnchor}
                onClose={() => setMenuAnchor(null)}
                MenuListProps={{
                  onMouseLeave: () => setMenuAnchor(null)
                }}
              >
                {
                  menuItems.map(({text, onClick}) => (
                    <MenuItem onClick={onClick}>{text}</MenuItem>
                  ))
                }
              </Menu>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{...sx, flex: 1}}>
        {children}
      </Box>
    </Box>
  )
}

export default Page