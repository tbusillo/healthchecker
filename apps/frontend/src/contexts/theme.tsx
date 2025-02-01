import { createContext, useContext, useState } from 'react'

export interface ThemeState {
  colorMode: string
  toggleColorMode: () => void
  toggleMenu: () => void
  closeMenu: () => void
  menuOpen: boolean
}

export interface ThemeProviderProps {
  children: React.ReactNode
}

const defaultContext = {
  colorMode: 'light',
  toggleColorMode: () => Promise.resolve(),
  toggleMenu: () => Promise.resolve(),
  closeMenu: () => Promise.resolve(),
  menuOpen: false
}

export const ThemeContext = createContext<ThemeState>(defaultContext)

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [colorMode, setColorMode] = useState<ThemeState['colorMode']>('light')
  const [menuOpen, setMenuOpen] = useState<ThemeState['menuOpen']>(false)

  const toggleColorMode = () => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light')
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    document.body.style.overflow = !menuOpen === true ? 'hidden' : 'initial'
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <ThemeContext.Provider
      value={{ colorMode, menuOpen, toggleColorMode, toggleMenu, closeMenu }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

const useThemeContext = (): ThemeState => useContext(ThemeContext)

ThemeProvider.displayName = 'ThemeProvider'

export { ThemeProvider, useThemeContext }
