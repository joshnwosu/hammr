import {
  ColorScheme,
  ColorSchemeProvider,
  Grid,
  MantineProvider,
  Paper,
  createStyles
} from '@mantine/core'
import React, { useState } from 'react'
// @ts-ignore
import { SwitchToggle } from './components/Widgets/SwitchTheme'
import { useCookies } from 'react-cookie'
import { Frame } from './components/Frame/Frame'
import PlayerControls from './components/PlayerControls/PlayerControls'
import Sidebar from './components/Sidebar/Sidebar'
import NowPlaying from './components/NowPlaying/NowPlaying'
import Tracks from './screens/Tracks/Tracks'
import Root from './components/Root/Root'

const useStyles = createStyles((theme) => ({
  col: {
    width: '100%',
    height: '100%',
    right: 0,
    padding: theme.spacing.md,
    backgroundColor: theme.colorScheme != 'dark' ? theme.colors.dark['9'] : theme.colors.gray[0]
  }
}))

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

  const { classes } = useStyles()

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
        <Root />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            width: '100%',
            height: '100%'
          }}
        >
          <Frame />
          <Grid
            style={{
              flex: 1
            }}
            sx={(theme) => ({
              backgroundColor: theme.colorScheme == 'dark' ? theme.black : theme.colors.gray[0]
            })}
            gutter={10}
            p={0}
            m={0}
          >
            <Grid.Col span={3}>
              <Paper className={classes.col} radius={'md'}>
                <Sidebar />
              </Paper>
            </Grid.Col>

            <Grid.Col span={'auto'}>
              <Paper className={classes.col} radius={'md'}>
                <Tracks />
              </Paper>
            </Grid.Col>

            <Grid.Col span={2}>
              <Paper className={classes.col} radius={'md'}>
                <NowPlaying />
              </Paper>
            </Grid.Col>
          </Grid>

          <PlayerControls />
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
