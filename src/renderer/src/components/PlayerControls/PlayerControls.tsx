import { usePlayerStore } from '@renderer/store/playerStore/playerStore'
import { useEffect } from 'react'
import { Box, Grid } from '@mantine/core'
import pcManager from '../../core/PlayerControlManager'
import TrackInfo from './layout/TrackInfo'
import PlaybackControls from './layout/PlaybackControls'
import VolumeAndAdditionalControls from './layout/VolumeAndAdditionalControls'

function PlayerControls() {
  const { trackFile } = usePlayerStore((state) => state)

  useEffect(() => {
    if (trackFile) {
      pcManager.initPlayer(trackFile)
      console.log('Track File:', trackFile)
    }
  }, [trackFile])

  return (
    <Box
      sx={(theme) => ({
        width: '100%',
        height: 80,
        backgroundColor: theme.colorScheme == 'dark' ? theme.black : theme.colors.gray[0]
      })}
    >
      <Grid
        grow
        style={{
          height: '100%'
        }}
        align="center"
        justify="center"
        m={0}
      >
        <Grid.Col span={3}>
          <TrackInfo />
        </Grid.Col>
        <Grid.Col span={6}>
          <PlaybackControls />
        </Grid.Col>
        <Grid.Col span={3}>
          <VolumeAndAdditionalControls />
        </Grid.Col>
      </Grid>
    </Box>
  )
}

export default PlayerControls
