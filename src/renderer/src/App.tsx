import {
  Box,
  Button,
  ColSpan,
  ColorScheme,
  ColorSchemeProvider,
  Grid,
  MantineProvider,
  Paper,
  Text,
  Tooltip,
  createStyles
} from '@mantine/core'
import React, { useState } from 'react'
import { SwitchToggle } from './components/widgets/SwitchTheme'
import { useCookies } from 'react-cookie'
import { Frame } from './components/root/Frame'

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

  const [navbarSize, setNavbarSize] = useState<ColSpan>(2)

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
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
            <Grid.Col span={navbarSize}>
              <Paper className={classes.col} radius={'md'}>
                <Text>Navbar component</Text>
                <Tooltip label="Expand">
                  <Button
                    onClick={() => {
                      if (navbarSize === 2) setNavbarSize('auto')
                      else setNavbarSize(2)
                    }}
                  >
                    Expand
                  </Button>
                </Tooltip>
              </Paper>
            </Grid.Col>
            <Grid.Col span={'auto'}>
              <Paper className={classes.col} radius={'md'}>
                <SwitchToggle />
                <Text>Tracks component</Text>
              </Paper>
            </Grid.Col>
            {true && (
              <Grid.Col span={2}>
                <Paper className={classes.col} radius={'md'}>
                  <Text>Nowplaying component</Text>
                </Paper>
              </Grid.Col>
            )}
          </Grid>

          <Box
            sx={(theme) => ({
              height: 80,
              padding: theme.spacing.md,
              backgroundColor: theme.colorScheme == 'dark' ? theme.black : theme.colors.gray[0]
            })}
          >
            <Text>PlayerControl component</Text>
          </Box>
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
