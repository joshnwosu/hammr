import { ActionIcon, Flex } from '@mantine/core'
import pcManager from '@renderer/core/PlayerControlManager'
import { usePlayerStore } from '@renderer/store/playerStore/playerStore'
import {
  TbPlayerPause,
  TbPlayerPlay,
  TbArrowsShuffle,
  TbRepeat,
  TbRepeatOff,
  TbRepeatOnce,
  TbPlayerTrackPrev,
  TbPlayerTrackNext,
  TbPlayerSkipBack,
  TbPlayerSkipForward,
  TbPlayerPauseFilled,
  TbPlayerPlayFilled
} from 'react-icons/tb'

export default function PlaybackControls() {
  const { playerStatus } = usePlayerStore((state) => state)

  const { playing, shuffle } = playerStatus
  return (
    <Flex
      style={{
        height: '100%'
      }}
      align={'center'}
      justify={'center'}
    >
      <Flex gap={'md'} align={'center'}>
        <ActionIcon
          variant="light"
          size={'lg'}
          radius={'xl'}
          onClick={() => pcManager.shuffleTrack()}
        >
          <TbArrowsShuffle size={'1.2rem'} strokeWidth={2} color={shuffle ? 'green' : 'white'} />
        </ActionIcon>

        <ActionIcon
          variant="light"
          size={'lg'}
          radius={'xl'}
          onClick={() => pcManager.previousTrack()}
        >
          <TbPlayerSkipBack size={'1.2rem'} strokeWidth={2} />
        </ActionIcon>
        <ActionIcon
          variant="light"
          size={'lg'}
          radius={'xl'}
          onClick={() => pcManager.stepBackward()}
        >
          <TbPlayerTrackPrev size={'1.2rem'} strokeWidth={2} />
        </ActionIcon>
        <ActionIcon
          variant="default"
          size={'xl'}
          radius={'xl'}
          onClick={() => pcManager.togglePlaying()}
        >
          {playing ? (
            <TbPlayerPause size={'1.5rem'} strokeWidth={2} />
          ) : (
            <TbPlayerPlay size={'1.5rem'} strokeWidth={2} />
          )}
        </ActionIcon>
        <ActionIcon
          variant="light"
          size={'lg'}
          radius={'xl'}
          onClick={() => pcManager.stepForward()}
        >
          <TbPlayerTrackNext size={'1.2rem'} strokeWidth={2} />
        </ActionIcon>
        <ActionIcon variant="light" size={'lg'} radius={'xl'} onClick={() => pcManager.nextTrack()}>
          <TbPlayerSkipForward size={'1.2rem'} strokeWidth={2} />
        </ActionIcon>

        <ActionIcon
          variant="light"
          size={'lg'}
          radius={'xl'}
          onClick={() => pcManager.repeatTrack()}
        >
          <TbRepeat size={'1.2rem'} strokeWidth={2} />
        </ActionIcon>
      </Flex>
    </Flex>
  )
}
