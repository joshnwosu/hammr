import { ActionIcon, Avatar, Box, Flex, Text, Tooltip, createStyles } from '@mantine/core'
import pcManager from '@renderer/core/PlayerControlManager'
import { Track as ITrack, usePlayerStore } from '@renderer/store/playerStore/playerStore'
import { usePlaylistStore } from '@renderer/store/playlistStore/playlistStore'
import { useEffect } from 'react'
import 'react-virtualized/styles.css'
import trackUtils from '@renderer/utils/TrackUtils'
import { TbDots, TbHeart } from 'react-icons/tb'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

const useStyles = createStyles((theme) => ({
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

const Tracks = () => {
  const { classes } = useStyles()

  const { tracks, trackFile } = usePlayerStore((state) => state)

  const { playlist } = usePlaylistStore((state) => state)

  useEffect(() => {
    console.log('Tahtah', playlist)
  }, [playlist])

  const TrackList = ({
    track,
    style,
    index
  }: {
    track: ITrack
    style: React.CSSProperties
    index: number
  }) => {
    return (
      <div
        style={style}
        className={track.r_fileLocation === trackFile ? classes.currentTrack : classes.track}
        onClick={() => {
          pcManager.selectedTrack(track.r_fileLocation, tracks)
        }}
      >
        <Flex align={'center'} gap={'md'} style={{ flex: 5, overflow: 'hidden' }}>
          <Text w={20} fz={'sm'}>
            {trackUtils.formatIndex(index)}
          </Text>
          <Avatar size="md" radius="sm" src={track.albumArt || ''} alt="Album Art" />
          <div style={{ overflow: 'hidden' }}>
            <Text fz={'sm'} truncate>
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
            <ActionIcon variant="transparent" size={'lg'} radius={'xl'}>
              <TbHeart size={'1rem'} strokeWidth={1} />
            </ActionIcon>
          </Tooltip>
          <Text fz={'sm'}>{'04:25'}</Text>
          <Tooltip label={'More options'} fz={'xs'} fw={600} color="gray">
            <ActionIcon variant="transparent" size={'lg'} radius={'xl'}>
              <TbDots size={'1.5rem'} strokeWidth={1} />
            </ActionIcon>
          </Tooltip>
        </Flex>
      </div>
    )
  }

  return (
    <Box
      style={{
        width: '100%',
        height: '100%'
      }}
    >
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList height={height} width={width} itemCount={tracks.length} itemSize={60}>
            {({ index, style }) => {
              const track = tracks[index]
              return (
                <TrackList key={track.r_fileLocation} track={track} style={style} index={index} />
              )
            }}
          </FixedSizeList>
        )}
      </AutoSizer>
    </Box>
  )
}

export default Tracks
