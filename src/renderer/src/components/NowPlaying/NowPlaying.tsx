import { ActionIcon, Flex, Paper, Text, createStyles } from '@mantine/core'
import { useAppStore } from '@renderer/store/appStore/appStore'
import { usePlayerStore } from '@renderer/store/playerStore/playerStore'
import { TbX } from 'react-icons/tb'

const useStyles = createStyles(() => ({
  wrapper: {
    backgroundColor: '#111111',
    height: '100%'
  }
}))

export default function NowPlaying() {
  const { classes } = useStyles()
  const { playerStatus } = usePlayerStore((state) => state)
  const { toggleNowPlayingView } = useAppStore((state) => state)
  const { nowPlaying } = playerStatus

  const handleClose = () => {
    toggleNowPlayingView(false)
  }

  return (
    <Paper className={classes.wrapper} radius={'md'} p={'md'}>
      <Flex align={'center'} justify={'space-between'}>
        <Text fz={'lg'}>{nowPlaying.title}</Text>
        <ActionIcon onClick={handleClose} size={'lg'} radius={'xl'}>
          <TbX size={'1.2rem'} color="dimmed" />
        </ActionIcon>
      </Flex>
    </Paper>
  )
}
