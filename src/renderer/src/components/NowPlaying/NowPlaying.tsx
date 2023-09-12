import { Box, Text, createStyles } from '@mantine/core'

const useStyles = createStyles(() => ({
  wrapper: {
    backgroundColor: '#111111',
    width: 300,
    borderRadius: 0,
    borderTopLeftRadius: 20,
    height: '100%',
    padding: 20
  }
}))

export default function NowPlaying() {
  const { classes } = useStyles()
  return (
    <Box className={classes.wrapper}>
      <Text>Nowplaying</Text>
    </Box>
  )
}
