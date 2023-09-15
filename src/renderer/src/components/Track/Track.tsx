import { Track as ITrack } from '@renderer/store/playerStore/playerStore'
import pcManager from '@renderer/core/PlayerControlManager'
import { Flex, createStyles, Text, Avatar, Tooltip, ActionIcon } from '@mantine/core'
import { useEffect, useState } from 'react'
import trackUtils from '@renderer/utils/TrackUtils'
import { TbHeart, TbDots } from 'react-icons/tb'

interface TrackProps {
  track: ITrack
  tracks: ITrack[]
  trackFile: string
  index: number
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    alignItems: 'center',
    padding: '10px 20px'
    // ':hover': {
    //   backgroundColor: 'purple'
    // }
  },

  track: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    marginRight: theme.spacing.lg,
    borderRadius: theme.radius.sm,
    gap: theme.spacing.md,
    ':hover': {
      backgroundColor: theme.colors.dark[6]
    }
  },

  currentTrack: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    marginRight: theme.spacing.lg,
    borderRadius: theme.radius.sm,
    gap: theme.spacing.md,
    backgroundColor: theme.colors.dark[7]
  }
}))

export default function Track({ track, tracks, trackFile, index }: TrackProps) {
  const { classes } = useStyles()
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(trackFile === track.r_fileLocation ? true : false)
  }, [trackFile, track])

  return (
    <div
      className={active ? classes.currentTrack : classes.track}
      onClick={() => {
        pcManager.selectedTrack(track.r_fileLocation, tracks)
      }}
    >
      <Flex align={'center'} gap={'md'} style={{ flex: 5, overflow: 'hidden' }}>
        <Text w={20} fz={'sm'}>
          {trackUtils.formatIndex(index)}
        </Text>
        <Avatar size="md" src={track.albumArt || ''} alt="Album Art" />
        <div style={{ overflow: 'hidden' }}>
          <Text fz={'md'} truncate>
            {track.title}
          </Text>
          <Text color="dimmed" fz={'sm'}>
            {track.artist}
          </Text>
        </div>
      </Flex>

      <Flex style={{ flex: 2, overflow: 'hidden' }}>
        <Text fz={'sm'}>{track.album}</Text>
      </Flex>

      <Flex style={{ flex: 2, overflow: 'hidden' }}>
        <Text fz={'sm'}>{track.genre}</Text>
      </Flex>

      <Flex style={{ flex: 1, overflow: 'hidden' }}>
        <Text fz={'sm'}>{track.year}</Text>
      </Flex>

      <Flex
        style={{
          overflow: 'hidden'
        }}
        align={'center'}
        justify={'flex-end'}
        gap={'sm'}
      >
        <Tooltip label={'Add to favorites'} fz={'xs'} fw={600} color="gray">
          <ActionIcon
            variant="transparent"
            size={'lg'}
            radius={'xl'}
            //   onClick={() => pcManager.stepBackward()}
          >
            <TbHeart size={'1.2rem'} strokeWidth={1} />
          </ActionIcon>
        </Tooltip>
        <Text fz={'sm'}>{'04:25'}</Text>
        <Tooltip label={'More options'} fz={'xs'} fw={600} color="gray">
          <ActionIcon
            variant="transparent"
            size={'lg'}
            radius={'xl'}
            //   onClick={() => pcManager.stepBackward()}
          >
            <TbDots size={'1.5rem'} strokeWidth={1} />
          </ActionIcon>
        </Tooltip>
      </Flex>
    </div>
  )

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
