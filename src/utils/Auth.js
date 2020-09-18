import React from 'react'
import { useUser } from 'reactfire'

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
    const user = useUser()

    return (
        <AuthContext.Provider value={{currentUser: user}}>
            {children}
        </AuthContext.Provider>
    )
}