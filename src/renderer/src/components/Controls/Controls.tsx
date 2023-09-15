import { Flex, createStyles } from '@mantine/core'
import CurrentTrack from './CurrentTrack/CurrentTrack'
import PlayerControls from './PlayerControls/PlayerControls'
import VolumeControls from './VolumeControls/VolumeControls'
import { useEffect } from 'react'
import { usePlayerStore } from '@renderer/store/playerStore/playerStore'
import pcManager from '@renderer/core/PlayerControlManager'

const useStyles = createStyles(() => ({
  wrapper: {
    width: '100%',
    maxHeight: 80
  }
}))

export default function Controls() {
  const { trackFile } = usePlayerStore((state) => state)
  const { classes } = useStyles()

  useEffect(() => {
    if (trackFile) {
      pcManager.initPlayer(trackFile)
    }
  }, [trackFile])

  return (
    <>
      <Flex className={classes.wrapper} justify={'space-between'} align={'center'} p={'lg'}>
        <CurrentTrack />
        <PlayerControls />
        <VolumeControls />
      </Flex>
    </>
  )
}
