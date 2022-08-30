import React from "react"
import AuthRouter from "./RouteControllers/AuthRouter"
import Dashboard from "./RouteControllers/Dashboard"
import { useAuth } from "./Providers/AuthProvider"
import {useCustomTheme} from "./Providers/CustomThemeProvider";

const App = () => {
  const { getCurrentUser } = useAuth()
  const { initialiseTheme } = useCustomTheme()

  initialiseTheme()

  if (getCurrentUser()) return <Dashboard />
  else return <AuthRouter />
}

export default App
