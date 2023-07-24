import {
  Box,
  ColorScheme,
  ColorSchemeProvider,
  Grid,
  MantineProvider,
  Paper,
  Text
} from '@mantine/core'
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
        <Box
          sx={(theme) => ({
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: theme.colorScheme == 'dark' ? theme.black : theme.white
          })}
        >
          <Grid
            gutter={6}
            sx={{
              width: '100%',
              height: 'calc(100% - 80px)'
            }}
          >
            <Grid.Col span={'auto'}>
              <Paper sx={{ height: '100%' }} radius={'md'}>
                <Text>Hello world</Text>
              </Paper>
            </Grid.Col>
            <Grid.Col span={6}>
              <Paper sx={{ height: '100%' }} radius={'md'}>
                <SwitchToggle />
              </Paper>
            </Grid.Col>
            <Grid.Col span={'auto'}>
              <Paper sx={{ height: '100%' }} radius={'md'}>
                <Text>3</Text>
              </Paper>
            </Grid.Col>
          </Grid>

          <Box
            style={{
              position: 'absolute',
              right: 0,
              left: 0,
              bottom: 0,
              height: 80,
              background: 'red'
            }}
          ></Box>
        </Box>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
