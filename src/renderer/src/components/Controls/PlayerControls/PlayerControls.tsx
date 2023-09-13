import { ActionIcon, Flex, MantineSize, Tooltip, createStyles } from '@mantine/core'
import pcManager from '@renderer/core/PlayerControlManager'
import { usePlayerStore } from '@renderer/store/playerStore/playerStore'
import { RepeatEnum } from '@renderer/store/playerStore/types'
import {
  TbArrowsShuffle,
  TbPlayerPause,
  TbPlayerPlay,
  TbPlayerSkipBack,
  TbPlayerSkipForward,
  TbPlayerTrackNext,
  TbPlayerTrackPrev,
  TbRepeat,
  TbRepeatOnce
} from 'react-icons/tb'
import Seek from './Seek'

const useStyles = createStyles(() => ({
  wrapper: {
    width: '50%',
    border: '1px solid red'
  }
}))

export default function PlayerControls() {
  const { classes } = useStyles()
  const { playerStatus } = usePlayerStore()
  const { shuffle, playing, repeat } = playerStatus

  return (
    <Flex className={classes.wrapper}>
      <Flex align={'center'} gap={'md'}>
        <Tooltip label={shuffle ? 'Disable Shuffle' : 'Enable Shuffle'}>
          <CustomIcon onClick={() => pcManager.shuffleTrack()}>
            <TbArrowsShuffle color={shuffle ? '#1FDF64' : ''} size={'1.2rem'} strokeWidth={2} />
          </CustomIcon>
        </Tooltip>
        <Tooltip label={'Previous'}>
          <CustomIcon onClick={() => pcManager.previousTrack()}>
            <TbPlayerSkipBack />
          </CustomIcon>
        </Tooltip>
        <Tooltip label={'Step back'}>
          <CustomIcon onClick={() => pcManager.stepBackward()}>
            <TbPlayerTrackPrev />
          </CustomIcon>
        </Tooltip>
        <Tooltip label={playing ? 'Pause' : 'Play'}>
          <CustomIcon onClick={() => pcManager.togglePlaying()} size={'xl'}>
            {playing ? (
              <TbPlayerPause size={'1.5rem'} strokeWidth={2} />
            ) : (
              <TbPlayerPlay size={'1.5rem'} strokeWidth={2} />
            )}
          </CustomIcon>
        </Tooltip>
        <Tooltip label={'Step forward'}>
          <CustomIcon onClick={() => pcManager.previousTrack()}>
            <TbPlayerTrackNext />
          </CustomIcon>
        </Tooltip>
        <Tooltip label={'Nest'}>
          <CustomIcon onClick={() => pcManager.stepBackward()}>
            <TbPlayerSkipForward />
          </CustomIcon>
        </Tooltip>
        <Tooltip label={`Repeat ${repeat}`}>
          <CustomIcon onClick={() => pcManager.repeatTrack()}>
            {repeat !== RepeatEnum.One && (
              <TbRepeat
                size={'1rem'}
                color={repeat !== RepeatEnum.Off ? '#1FDF64' : ''}
                strokeWidth={2}
              />
            )}
            {repeat === RepeatEnum.One && (
              <TbRepeatOnce size={'1rem'} color={'#1FDF64'} strokeWidth={2} />
            )}
          </CustomIcon>
        </Tooltip>
      </Flex>
      <Seek />
    </Flex>
  )
}

interface CustomIconProps {
  children: React.ReactNode
  size?: MantineSize | number
  onClick?: () => void
}

function CustomIcon({ children, size, onClick }: CustomIconProps) {
  return (
    <ActionIcon size={size || 'lg'} onClick={onClick} variant={'light'} radius={'xl'}>
      {children}
    </ActionIcon>
  )
}
