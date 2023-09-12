import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import Root from './components/Root/Root'

const App: React.FC = () => {
  const [cookie, setCookie] = useCookies()
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    cookie['mantine-color-scheme'] || 'dark'
  )

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark')
    setColorScheme(nextColorScheme)
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 })
  }

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme
        }}
      >
        <Root />
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
