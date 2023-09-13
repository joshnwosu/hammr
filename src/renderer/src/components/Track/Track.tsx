import { Track as ITrack } from '@renderer/store/playerStore/playerStore'
import pcManager from '@renderer/core/PlayerControlManager'
import { Flex, createStyles, Text, Avatar } from '@mantine/core'
import { useEffect, useState } from 'react'

interface TrackProps {
  track: ITrack
  tracks: ITrack[]
  trackFile: string
}

const useStyles = createStyles(() => ({
  wrapper: {
    alignItems: 'center',
    padding: '10px 20px'
  }
}))

export default function Track({ track, tracks, trackFile }: TrackProps) {
  const { classes } = useStyles()
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(trackFile === track.r_fileLocation ? true : false)
  }, [trackFile, track])

  return (
    <Flex
      className={classes.wrapper}
      style={{
        backgroundColor: active ? 'blue' : 'transparent'
      }}
      onClick={() => {
        pcManager.selectedTrack(track.r_fileLocation, tracks)
      }}
    >
      <Avatar size="md" radius="sm" src={track.albumArt || ''} alt="Album Art" mr={'xl'} />
      <Text>{track.title}</Text>
    </Flex>
  )
}
