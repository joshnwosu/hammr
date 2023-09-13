import { Box, Flex } from '@mantine/core'
import Track from '@renderer/components/Track/Track'
import { usePlayerStore } from '@renderer/store/playerStore/playerStore'

const Tracks = () => {
  const { tracks, trackFile } = usePlayerStore((state) => state)

  return (
    <Box style={{ overflow: 'auto' }} p={20}>
      <Flex direction={'column'}>
        {tracks.map((track, index) => {
          return <Track track={track} tracks={tracks} trackFile={trackFile} key={index} />
        })}
      </Flex>
    </Box>
  )
}

export default Tracks
