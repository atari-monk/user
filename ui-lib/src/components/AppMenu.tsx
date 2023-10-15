import React, { useState } from 'react'
import DarkModeToggle from './DarkModeToggle'
import {
  AppNameH1,
  MenuDiv,
  AppMenuDiv as AppMenuContainer,
  MessageP,
} from '../styles'
import { LoginGoogle, appConfig } from 'auth-lib'
import IAppMenuProps from './IAppMenuProps'

const AppMenu: React.FC<IAppMenuProps> = ({ axiosInstance }) => {
  const [message, setMessage] = useState('')

  return (
    <AppMenuContainer>
      <AppNameH1>Task App</AppNameH1>
      <MenuDiv>
        <LoginGoogle
          config={appConfig}
          setMessage={setMessage}
          axiosInstance={axiosInstance}
        />
        <DarkModeToggle />
      </MenuDiv>
      {message && <MessageP>{message}</MessageP>}
    </AppMenuContainer>
  )
}

export default AppMenu
