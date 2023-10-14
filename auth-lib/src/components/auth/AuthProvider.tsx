import React, { useState } from 'react'
import IAuthProviderProps from '../../interfaces/auth/IAuthProviderProps'
import { AuthContext } from './AuthContext'

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState<string>('')
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userId, setUserId }}
    >
      {children}
    </AuthContext.Provider>
  )
}
