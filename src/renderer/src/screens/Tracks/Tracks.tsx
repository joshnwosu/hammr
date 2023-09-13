import { Box, Flex } from '@mantine/core'
import Track from '@renderer/components/Track/Track'
import { usePlayerStore } from '@renderer/store/playerStore/playerStore'
import { usePlaylistStore } from '@renderer/store/playlistStore/playlistStore'
import playlistUtils from '@renderer/utils/PlaylistUtils'
import { useEffect } from 'react'

const Tracks = () => {
  const { tracks, trackFile } = usePlayerStore((state) => state)

  const { playlist } = usePlaylistStore((state) => state)

  useEffect(() => {
    console.log('Tahtah', playlist)
  }, [playlist])

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
