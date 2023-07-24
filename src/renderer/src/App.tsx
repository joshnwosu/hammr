import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import React, { useState } from 'react'
import { SwitchToggle } from './components/widgets/SwitchTheme'
import { useCookies } from 'react-cookie'

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
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
        <div style={{ height: '100vh' }}>
          <SwitchToggle />
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
