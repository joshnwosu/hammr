import { Box, Flex, Paper, createStyles } from '@mantine/core'
import { Frame } from '../Frame/Frame'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import NowPlaying from '../NowPlaying/NowPlaying'
import Controls from '../Controls/Controls'
import IpcListener from '../IpcListener/IpcListener'
import { Outlet } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  box: {
    width: '100%',
    height: '100vh',
    flexDirection: 'column'
  },
  wrapper: {
    width: '100%',
    flexDirection: 'column',
    backgroundColor: theme.black,
    flex: 1
  },

  inner: {
    flex: 1
  },

  nav: {
    width: 380,
    flexDirection: 'column'
  },

  main: {
    flex: 1
  },

  scene: {
    backgroundColor: '#111111',
    flex: 1
  },

  sceneBox: {
    width: '100%',
    height: '100%'
  }
}))

export default function Layout2() {
  const { classes } = useStyles()

  const gap = 8

  return (
    <Flex className={classes.box}>
      <Frame />
      <IpcListener />
      <Flex className={classes.wrapper} gap={gap} p={gap}>
        <Flex className={classes.inner} gap={gap}>
          <Flex className={classes.nav} gap={gap}>
            <Navbar />
            <Sidebar />
          </Flex>
          <Flex className={classes.main} gap={gap}>
            <Scene />
            <NowPlaying />
          </Flex>
        </Flex>
        <Controls />
      </Flex>
    </Flex>
  )
}

function Scene() {
  const { classes } = useStyles()
  return (
    <Paper className={classes.scene} radius={'md'}>
      <Box className={classes.sceneBox}>
        <Outlet />
      </Box>
    </Paper>
  )
}
