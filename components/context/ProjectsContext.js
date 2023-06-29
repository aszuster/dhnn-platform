import { createContext, useState } from "react"
export const contexto = createContext()
const Provider = contexto.Provider

export const ProjectProvider = ({ children }) => {
  const [state, setState] = useState("All")

  const filter = {
    state: state,
    setState: setState,
  }
  return <Provider value={filter}>{children}</Provider>
}
