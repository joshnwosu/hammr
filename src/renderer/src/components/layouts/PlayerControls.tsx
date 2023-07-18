import { Track, usePlayerStore } from '@renderer/store/playerStore'
import { useEffect, useRef } from 'react'
import path from 'path-browserify'

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
      <audio ref={audioRef} />
    </>
  )
}

export default PlayerControls
