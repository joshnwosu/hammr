import { Box, Flex } from '@mantine/core'
import { usePlayerStore } from '@renderer/store/playerStore/playerStore'
import { usePlaylistStore } from '@renderer/store/playlistStore/playlistStore'
import { useEffect } from 'react'

import Track from '@renderer/components/Track/Track'
import VirtualTracks from './VirtualTracks'

const Tracks = () => {
  const { tracks, trackFile } = usePlayerStore((state) => state)
  const { playlist } = usePlaylistStore((state) => state)

  useEffect(() => {
    console.log('playlist:', playlist)
  }, [playlist])

  return (
    <Box
      style={{
        width: '100%',
        height: '100%'
      }}
    >
      <Flex direction={'column'}>
        {tracks.map((track, index) => {
          return (
            <Track track={track} tracks={tracks} index={index} trackFile={trackFile} key={index} />
          )
        })}
      </Flex>
      <VirtualTracks />
    </Box>
  )
}

export default Tracks
