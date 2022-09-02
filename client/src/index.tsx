import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import {BrowserRouter} from "react-router-dom"
import "./public.css"
import UtilProvider from "./Providers/UtilProvider"
import {AuthProvider} from "./Providers/AuthProvider"
import CustomThemeProvider from "./Providers/CustomThemeProvider";
import {store} from './store'
import {Provider as ReduxProvider} from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={new QueryClient()}>
          <ReduxProvider store={store}>
            <CustomThemeProvider>
              <UtilProvider>
                  <App/>
              </UtilProvider>
            </CustomThemeProvider>
          </ReduxProvider>
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
