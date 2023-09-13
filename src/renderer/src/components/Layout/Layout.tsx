import { Box, Paper, ScrollArea, createStyles } from '@mantine/core'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import NowPlaying from '../NowPlaying/NowPlaying'
import Controls from '../Controls/Controls'
import { Frame } from '../Frame/Frame'
import IpcListener from '../IpcListener/IpcListener'

const useStyles = createStyles((theme) => ({
  wrapper: {
    width: '100%',
    height: '100%',
    zIndex: 9999999,
    position: 'fixed',
    backgroundColor: theme.black,
    display: 'flex',
    flexDirection: 'column'
  },

  inner: {
    flex: 1,
    display: 'flex',
    overflow: 'auto'
  },

  scene: {
    width: '100%',
    backgroundColor: theme.black,
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    borderTopLeftRadius: theme.radius.lg,
    gap: 8
  },

  main: {
    backgroundColor: '#111111',
    flex: 1,
    borderRadius: 0,
    borderTopLeftRadius: theme.radius.md,
    borderTopRightRadius: theme.radius.md,
    height: '100%',
    overflowY: 'auto'
  }
}))

export default function Layout() {
  const { classes } = useStyles()
  return (
    <Box className={classes.wrapper}>
      <IpcListener />
      <Frame />
      <Box className={classes.inner}>
        <Sidebar />
        <Box className={classes.scene}>
          <Paper className={classes.main}>
            <ScrollArea h={'100%'}>
              <Outlet />
            </ScrollArea>
          </Paper>
          <NowPlaying />
        </Box>
      </Box>
      <Controls />
    </Box>
  )
}
