import { Track as ITrack } from '@renderer/store/playerStore/playerStore'
import pcManager from '@renderer/core/PlayerControlManager'
import { Flex, createStyles, Text, Avatar, Tooltip, ActionIcon, Box } from '@mantine/core'
import { useEffect, useState } from 'react'
import trackUtils from '@renderer/utils/TrackUtils'
import { TbHeart, TbDots } from 'react-icons/tb'

interface TrackProps {
  track: ITrack
  tracks: ITrack[]
  trackFile: string
  index: number
  style?: React.CSSProperties
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    alignItems: 'center',
    padding: '10px 20px'
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

  appear: {
    visibility: 'visible',
    opacity: 1
  },

  disappear: {
    visibility: 'hidden',
    opacity: 0
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

export default function Track({ track, tracks, trackFile, index, style }: TrackProps) {
  const { classes } = useStyles()
  const [active, setActive] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    setActive(trackFile === track.r_fileLocation ? true : false)
  }, [trackFile, track])

  return (
    <Box
      style={style}
      className={active ? classes.currentTrack : classes.track}
      onDoubleClick={() => {
        pcManager.selectedTrack(track.r_fileLocation, tracks)
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Flex w={20}>
        <Text fz={'sm'}>{trackUtils.formatIndex(index)}</Text>
      </Flex>
      <Flex align={'center'} gap={'md'} style={{ flex: 5, overflow: 'hidden' }}>
        <Avatar size="md" src={track.albumArt || ''} alt="Album Art" />
        <div style={{ overflow: 'hidden' }}>
          <Text fz={'md'} truncate>
            {track.title}
          </Text>
          <Text color="dimmed" fz={'sm'} truncate>
            {track.artist}
          </Text>
        </div>
      </Flex>

      <Flex style={{ flex: 2, overflow: 'hidden' }}>
        <Text color="dimmed" fz={'md'} truncate>
          {track.album}
        </Text>
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
            className={isHovered ? classes.appear : classes.disappear}
          >
            <TbHeart size={'1.2rem'} strokeWidth={1} />
          </ActionIcon>
        </Tooltip>

        <Tooltip label={'More options'} fz={'xs'} fw={600} color="gray">
          <ActionIcon
            variant="transparent"
            size={'lg'}
            radius={'xl'}
            className={isHovered ? classes.appear : classes.disappear}
          >
            <TbDots size={'1.5rem'} strokeWidth={1} />
          </ActionIcon>
        </Tooltip>
      </Flex>
    </Box>
  )
}
