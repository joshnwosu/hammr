import { ActionIcon, Avatar, Box, Flex, Text, Tooltip, createStyles } from '@mantine/core'
import Track from '@renderer/components/Track/Track'
import pcManager from '@renderer/core/PlayerControlManager'
import { usePlayerStore } from '@renderer/store/playerStore/playerStore'
import { usePlaylistStore } from '@renderer/store/playlistStore/playlistStore'
import playlistUtils from '@renderer/utils/PlaylistUtils'
import { useEffect, useState } from 'react'
// import { AutoSizer, List } from 'react-virtualized'
import List from 'react-virtualized/dist/commonjs/List'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import 'react-virtualized/styles.css'
import trackUtils from '@renderer/utils/TrackUtils'
import { TbDots, TbHeart } from 'react-icons/tb'

const useStyles = createStyles((theme) => ({
  track: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    marginRight: theme.spacing.lg,
    borderRadius: theme.radius.sm,
    gap: theme.spacing.md,
    ':hover': {
      backgroundColor: theme.colors.gray[9]
    }
  }
}))

const Tracks = () => {
  const { classes } = useStyles()

  const { tracks, trackFile } = usePlayerStore((state) => state)

  const { playlist } = usePlaylistStore((state) => state)

  useEffect(() => {
    console.log('Tahtah', playlist)
  }, [playlist])

  return (
    <Box
      style={{
        width: '100%',
        height: '100%'
      }}
    >
      {/* <Flex direction={'column'}>
        {tracks.map((track, index) => {
          return <Track track={track} tracks={tracks} trackFile={trackFile} key={index} />
        })}
      </Flex> */}

      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            scrollToIndex={trackUtils.getTrackIndex(tracks, trackFile)}
            scrollToAlignment="center"
            rowCount={tracks.length}
            rowHeight={60}
            style={{
              paddingRight: 20,
              paddingLeft: 20
            }}
            rowRenderer={({
              index,
              key,
              style
            }: {
              index: number
              key: string
              style: React.CSSProperties
            }) => (
              <div
                key={key}
                style={{
                  ...style
                }}
                className={classes.track}
                onClick={() => {
                  pcManager.selectedTrack(tracks[index].r_fileLocation, tracks)
                  console.log({ style })
                }}
              >
                <Flex align={'center'} gap={'md'} style={{ flex: 5, overflow: 'hidden' }}>
                  <Text w={20} fz={'sm'}>
                    {trackUtils.formatIndex(index)}
                  </Text>
                  <Avatar
                    size="md"
                    radius="sm"
                    src={tracks[index].albumArt || ''}
                    alt="Album Art"
                  />
                  <div style={{ overflow: 'hidden' }}>
                    <Text fz={'sm'} truncate>
                      {tracks[index].title}
                    </Text>
                    <Text color="dimmed" fz={'sm'}>
                      {tracks[index].artist}
                    </Text>
                  </div>
                </Flex>

                <Flex style={{ flex: 2, overflow: 'hidden' }}>
                  <Text fz={'sm'}>{tracks[index].album}</Text>
                </Flex>

                <Flex style={{ flex: 2, overflow: 'hidden' }}>
                  <Text fz={'sm'}>{tracks[index].genre}</Text>
                </Flex>

                <Flex style={{ flex: 1, overflow: 'hidden' }}>
                  <Text fz={'sm'}>{tracks[index].year}</Text>
                </Flex>

                <Flex
                  style={{
                    // flex: 2,
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
                      <TbHeart size={'1rem'} strokeWidth={1} />
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
            )}
          />
        )}
      </AutoSizer>
    </Box>
  )
}

export default Tracks
