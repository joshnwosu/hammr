import { usePlayerStore } from '@renderer/store/playerStore/playerStore'
import { useEffect, useRef } from 'react'
import 'react-virtualized/styles.css'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import Track from '@renderer/components/Track/Track'
import { Box } from '@mantine/core'
import trackUtils from '@renderer/utils/TrackUtils'

const TrackVirtualizedList = () => {
  const listRef = useRef<any>()
  const { tracks, trackFile } = usePlayerStore((state) => state)

  useEffect(() => {
    const trackIndex = trackUtils.getTrackIndex(tracks, trackFile)
    listRef?.current?.scrollToItem(trackIndex)
  }, [trackFile])

  return (
    <Box
      style={{
        width: '100%',
        height: '100%'
      }}
    >
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            ref={listRef}
            height={height}
            width={width}
            itemCount={tracks.length}
            itemSize={60}
            layout="vertical"
          >
            {({ index, style }) => {
              const track = tracks[index]
              return (
                <Track
                  track={track}
                  tracks={tracks}
                  index={index}
                  trackFile={trackFile}
                  key={index}
                  style={style}
                />
              )
            }}
          </FixedSizeList>
        )}
      </AutoSizer>
    </Box>
  )
}

export default TrackVirtualizedList
