import {
  Box,
  ColorScheme,
  ColorSchemeProvider,
  Container,
  Grid,
  MantineProvider,
  Paper,
  Text,
  createStyles
} from '@mantine/core'
import React, { useState } from 'react'
import { SwitchToggle } from './components/widgets/SwitchTheme'
import { useCookies } from 'react-cookie'

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
        <Container fluid p={0}>
          <Grid
            style={{
              width: '100%',
              height: 'calc(100% - 80px)'
            }}
            sx={(theme) => ({
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: theme.colorScheme == 'dark' ? theme.black : theme.colors.gray[0]
            })}
            gutter={10}
            p={5}
            m={0}
          >
            <Grid.Col span={3}>
              <Paper className={classes.col} radius={'md'}>
                <Text>Navbar component</Text>
              </Paper>
            </Grid.Col>
            <Grid.Col span={'auto'}>
              <Paper className={classes.col} radius={'md'}>
                <SwitchToggle />
                <Text>Tracks component</Text>
              </Paper>
            </Grid.Col>
            <Grid.Col span={3}>
              <Paper className={classes.col} radius={'md'}>
                <Text>Nowplaying component</Text>
              </Paper>
            </Grid.Col>
          </Grid>

          <Box
            sx={(theme) => ({
              position: 'absolute',
              right: 0,
              left: 0,
              bottom: 0,
              height: 80,
              padding: theme.spacing.md,
              backgroundColor: theme.colorScheme == 'dark' ? theme.black : theme.colors.gray[0]
            })}
          >
            <Text>PlayerControl component</Text>
          </Box>
        </Container>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
