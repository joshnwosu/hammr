import { Paper, Text, createStyles } from '@mantine/core'

const useStyles = createStyles(() => ({
  wrapper: {
    backgroundColor: '#111111',
    height: '100%'
  }
}))

export default function NowPlaying() {
  const { classes } = useStyles()
  return (
    <Paper className={classes.wrapper} radius={'md'} p={'md'}>
      <Text>Nowplaying</Text>
    </Paper>
  )
}
