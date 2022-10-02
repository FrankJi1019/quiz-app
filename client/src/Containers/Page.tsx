import {Box, Menu, MenuItem, styled, SxProps} from "@mui/material"
import React, {FC, ReactNode, useMemo, useState} from "react";
import {useAuth} from "../Providers/AuthProvider";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useDispatch} from "react-redux";
import {showThemeSelector} from "../Slices/modalSlice";
import {useNavigate} from "react-router-dom";
import {getProfilePageURL} from "../routes";

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
          display: {
            xs: 'none',
            md: username && showHeader ? 'flex' : "none"
          },
          alignItems: 'center',
          padding: '10px 50px 10px',
          justifyContent: 'flex-end'
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
      <Box sx={{...sx, flex: 1}}>
        {children}
      </Box>
    </Box>
  )
}

export default Page