import { usePlayerStore } from '@renderer/store/playerStore'
import { useEffect } from 'react'
import { Box, Grid, Text } from '@mantine/core'
import pcManager from './PlayerControlManager'

function PlayerControls() {
  const { trackFile } = usePlayerStore((state) => state)

  useEffect(() => {
    if (trackFile) {
      pcManager.initPlayer(trackFile)
    }
  }, [trackFile])

  return (
    <>
      <Box
        sx={(theme) => ({
          height: 80,
          padding: theme.spacing.md,
          backgroundColor: theme.colorScheme == 'dark' ? theme.black : theme.colors.gray[0]
        })}
      >
        <Grid>
          <Grid.Col span={4}>
            <Text>1</Text>
          </Grid.Col>
          <Grid.Col span={4}>2</Grid.Col>
          <Grid.Col span={4}>3</Grid.Col>
        </Grid>
      </Box>
    </>
  )
}

export default PlayerControls
