import { Grid, Paper, createStyles } from '@mantine/core'
import { Frame } from '../Frame/Frame'
import IpcListener from '../IpcListener/IpcListener'
import Sidebar from '../Sidebar/Sidebar'
import AppRouter from '@renderer/routes/appRouter'
import NowPlaying from '../NowPlaying/NowPlaying'
import PlayerControls from '../PlayerControls/PlayerControls'

const useStyles = createStyles((theme) => ({
  grid: {
    backgroundColor: theme.colorScheme == 'dark' ? theme.black : theme.colors.gray[0]
  },
  col: {
    width: '100%',
    height: '100%',
    right: 0,
    padding: theme.spacing.md,
    backgroundColor: theme.colorScheme == 'dark' ? theme.colors.dark['9'] : theme.colors.gray[0]
  }
}))

export default function () {
  const { classes } = useStyles()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        width: '100%',
        height: '100%'
      }}
    >
      <IpcListener />
      <Frame />
      <Grid
        style={{
          flex: 1
        }}
        className={classes.grid}
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
            <AppRouter />
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
  )
}
