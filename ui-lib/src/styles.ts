//dark/light toogle feature
import styled from '@emotion/styled'
import { IStyledDarkModeToggleProps } from './IStyledDarkModeToggleProps'

const lightModeVariables = {
  '--background-color': '#f9f9f9',
  '--text-color': '#000',
  '--button-background': '#333',
  '--button-text': '#fff',
}

const darkModeVariables = {
  '--background-color': '#333',
  '--text-color': '#fff',
  '--button-background': '#f9f9f9',
  '--button-text': '#000',
}

export const StyledDarkModeToggle = styled.button<IStyledDarkModeToggleProps>`
  background-color: var(--button-background);
  color: var(--button-text);
  border: none;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 20px;
`

export const setDarkMode = (darkMode: boolean) => {
  const root = document.documentElement

  if (darkMode) {
    for (const [key, value] of Object.entries(darkModeVariables)) {
      root.style.setProperty(key, value)
    }
  } else {
    for (const [key, value] of Object.entries(lightModeVariables)) {
      root.style.setProperty(key, value)
    }
  }
}

export const DefaultContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--background-color);
  color: var(--text-color);
`
