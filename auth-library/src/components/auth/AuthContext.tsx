import React from 'react'
import IAuthContextProps from '../../interfaces/auth/IAuthContextProps'

export const AuthContext = React.createContext<IAuthContextProps>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userId: '',
  setUserId: () => {},
})
