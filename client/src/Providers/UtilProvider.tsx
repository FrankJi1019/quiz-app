import React, {createContext, useContext, useEffect, useState} from "react"

const context = createContext(
  {} as {
    forceRerender: () => any
    getScreenSize: () => number
  }
)

// @ts-ignore
const UtilProvider = ({ children }) => {
  const [text, setText] = useState(+new Date() + Math.random().toString())
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const resizeHandler = () => setScreenSize(window.innerWidth)
    window.addEventListener("resize", resizeHandler)
    return () => window.removeEventListener("resize", resizeHandler)
  }, [])

  const value = {
    forceRerender: () => setText(+new Date() + Math.random().toString()),
    getScreenSize: () => screenSize
  }

  return <context.Provider value={value}>{children}</context.Provider>
}

export default UtilProvider

export const useUtil = () => useContext(context)
