import React, { createContext, useContext, useState } from "react"

const context = createContext(
  {} as {
    forceRerender: () => any
  }
)

// @ts-ignore
const UtilProvider = ({ children }) => {
  const [text, setText] = useState(+new Date() + Math.random().toString())

  const value = {
    forceRerender: () => setText(+new Date() + Math.random().toString())
  }

  return <context.Provider value={value}>{children}</context.Provider>
}

export default UtilProvider

export const useUtil = () => useContext(context)
