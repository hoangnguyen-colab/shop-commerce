import React, { ReactNode, useEffect } from 'react'

const AuthContext = React.createContext({
  isAuthenticated: false,
  setAuthenticated: () => { },
})

export const AuthProvider = (props) => {
  const [isAuthenticated, setAuthenticated] = React.useState(props.authenticated);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function useIsAuthenticated() {
  const context = useAuth()
  return context?.isAuthenticated
}
