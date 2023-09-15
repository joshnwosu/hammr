import { usePlayerStore } from '@renderer/store/playerStore/playerStore'
import { useEffect, useRef } from 'react'
import 'react-virtualized/styles.css'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import Track from '@renderer/components/Track/Track'
import { Box } from '@mantine/core'
import trackUtils from '@renderer/utils/TrackUtils'

const TrackVirtualizedList = () => {
  const { tracks, trackFile } = usePlayerStore((state) => state)

  const listRef = useRef(null)
  const scrollableContainerRef = useRef(null)

  useEffect(() => {
    scrollTo(trackUtils.getTrackIndex(tracks, trackFile))
  }, [trackFile])

  // @ts-ignore
  const scrollTo = (scrollOffset: number) => {
    // Note that my list is vertical which is why I am feeding this to the "top" prop.
    if (scrollableContainerRef.current) {
      ;(scrollableContainerRef.current as any).scrollTo({
        left: 0,
        top: scrollOffset,
        behavior: 'smooth'
      })
    }
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
          <FixedSizeList
            height={height}
            width={width}
            itemCount={tracks.length}
            itemSize={60}
            ref={listRef}
            outerRef={scrollableContainerRef}
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
