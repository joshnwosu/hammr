import { Track, usePlayerStore } from '@renderer/store/playerStore'
import { useEffect, useRef } from 'react'
import path from 'path-browserify'
import { Box, Text } from '@mantine/core'

export function encodeTrackFile(track: Track) {
  let prefix = 'file://'
  let trackExtension = path.extname(track.fileLocation)
  let trackPath = track.folderInfo.path
  let encodedFileName = encodeURIComponent(path.basename(track.fileName))

  return prefix + path.join(trackPath, encodedFileName) + trackExtension
}

function PlayerControls() {
  const audioRef = useRef<HTMLAudioElement>(null)

  const { selectedTrack } = usePlayerStore((state) => state)

  const initPlayer = () => {
    const audioElement = audioRef.current as HTMLAudioElement
    // console.log('Selected Track: ', selectedTrack)

    audioElement.src = selectedTrack
    audioElement.onloadeddata = () => {
      audioElement.play()
    }
  }

  useEffect(() => {
    if (selectedTrack) {
      initPlayer()
    }
  }, [selectedTrack])

  return (
    <>
      <audio ref={audioRef} crossOrigin="anonymous" />
      <Box
        sx={(theme) => ({
          height: 80,
          padding: theme.spacing.md,
          backgroundColor: theme.colorScheme == 'dark' ? theme.black : theme.colors.gray[0]
        })}
      >
        <Text>PlayerControl component</Text>
      </Box>
    </>
  )
}

export default PlayerControls
