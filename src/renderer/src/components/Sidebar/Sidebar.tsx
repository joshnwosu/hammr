import { Paper, createStyles } from '@mantine/core'

const useStyles = createStyles(() => ({
  wrapper: {
    backgroundColor: '#111111',
    flex: 1
  }
}))

export default function Sidebar() {
  const { classes } = useStyles()
  return (
    <Paper className={classes.wrapper} radius={'md'} p={'md'}>
      <p>Sidebar</p>
    </Paper>
  )
}
