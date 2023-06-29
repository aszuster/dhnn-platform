import { createContext, useState } from "react"

export const contexto = createContext()

const Provider = contexto.Provider

export const MiProvider = ({ children }) => {
  const [visible, setVisible] = useState(false)

  const valorDelContexto = {
    visible: visible,
    setVisible: setVisible,
  }

  return <Provider value={valorDelContexto}>{children}</Provider>
}
