import { Box, Button } from '@mantine/core'
import Track from '@renderer/components/Track/Track'
import { usePlayerStore } from '@renderer/store/playerStore/playerStore'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'

export default function VirtualTracks() {
  const parentRef = useRef(null)
  const { tracks, trackFile } = usePlayerStore((state) => state)

  const count = tracks.length

  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 1
  })

  const items = virtualizer.getVirtualItems()

  return (
    <>
      <Box ref={parentRef} style={{}}>
        <Button
          onClick={() => {
            virtualizer.scrollToIndex(count - 1)
          }}
        >
          Scroll to Bottom
        </Button>
        <div
        // style={{
        //   height: `${virtualizer.getTotalSize()}px`,
        //   width: '100%',
        //   position: 'relative'
        // }}
        >
          {virtualizer.getTotalSize()}
          {items.map((virtualRow) => (
            <div
              key={virtualRow.index}
              className={`${virtualRow.index}`}
              ref={virtualizer.measureElement}
            >
              <Track
                track={tracks[virtualRow.index]}
                tracks={tracks}
                index={virtualRow.index}
                trackFile={trackFile}
                key={virtualRow.index}
              />
            </div>
          ))}
        </div>
      </Box>
    </>
  )
}
