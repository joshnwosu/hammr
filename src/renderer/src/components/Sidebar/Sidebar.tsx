import { Button, ColSpan, Text, Tooltip } from '@mantine/core'
import { useState } from 'react'
import {
  TbHome2,
  TbPlayerPlay,
  TbPlayerPause,
  TbArrowsShuffle,
  TbRepeat,
  TbRepeatOff,
  TbRepeatOnce,
  TbPlayerTrackPrev,
  TbPlayerTrackNext,
  TbPlayerSkipBack,
  TbPlayerSkipForward
} from 'react-icons/tb'

export default function Sidebar() {
  const [navbarSize, setNavbarSize] = useState<ColSpan>(2)
  return (
    <div>
      <Text>Navbar component</Text>
      <Tooltip label="Expand">
        <Button
          onClick={() => {
            if (navbarSize === 2) setNavbarSize('auto')
            else setNavbarSize(2)
          }}
        >
          Expand
        </Button>
      </Tooltip>
      <div>
        <TbPlayerPlay size={'5rem'} strokeWidth={1} />
        <TbPlayerPause size={'5rem'} strokeWidth={1} />
        <TbArrowsShuffle size={'5rem'} strokeWidth={1} />
        <TbRepeat size={'5rem'} strokeWidth={1} />
        <TbRepeatOff size={'5rem'} strokeWidth={1} />
        <TbRepeatOnce size={'5rem'} strokeWidth={1} />
        <TbPlayerTrackPrev size={'5rem'} strokeWidth={1} />
        <TbPlayerTrackNext size={'5rem'} strokeWidth={1} />
        <TbPlayerSkipBack size={'5rem'} strokeWidth={1} />
        <TbPlayerSkipForward size={'5rem'} strokeWidth={1} />
        <TbHome2 size={'5rem'} strokeWidth={1} />
      </div>
    </div>
  )
}
