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
    width: '50%'
  }
}))

export default function PlayerControls() {
  const { classes } = useStyles()
  const { playerStatus } = usePlayerStore()
  const { shuffle, playing, repeat } = playerStatus

  const iconSize = '1.2rem'

  return (
    <Flex className={classes.wrapper} direction={'column'} align={'center'}>
      <Flex align={'center'} gap={'md'} mb={'sm'}>
        <Tooltip label={shuffle ? 'Disable Shuffle' : 'Enable Shuffle'}>
          <CustomIcon onClick={() => pcManager.shuffleTrack()}>
            <TbArrowsShuffle color={shuffle ? '#1FDF64' : ''} size={iconSize} strokeWidth={2} />
          </CustomIcon>
        </Tooltip>
        <Tooltip label={'Previous'}>
          <CustomIcon onClick={() => pcManager.previousTrack()}>
            <TbPlayerSkipBack size={iconSize} />
          </CustomIcon>
        </Tooltip>
        <Tooltip label={'Step back'}>
          <CustomIcon onClick={() => pcManager.stepBackward()}>
            <TbPlayerTrackPrev size={iconSize} />
          </CustomIcon>
        </Tooltip>
        <Tooltip label={playing ? 'Pause' : 'Play'}>
          <CustomIcon onClick={() => pcManager.togglePlaying()} size={'xl'}>
            {playing ? (
              <TbPlayerPause size={'2rem'} strokeWidth={2} />
            ) : (
              <TbPlayerPlay size={'2rem'} strokeWidth={2} />
            )}
          </CustomIcon>
        </Tooltip>
        <Tooltip label={'Step forward'}>
          <CustomIcon onClick={() => pcManager.previousTrack()}>
            <TbPlayerTrackNext size={iconSize} />
          </CustomIcon>
        </Tooltip>
        <Tooltip label={'Nest'}>
          <CustomIcon onClick={() => pcManager.stepBackward()}>
            <TbPlayerSkipForward size={iconSize} />
          </CustomIcon>
        </Tooltip>
        <Tooltip label={`Repeat ${repeat}`}>
          <CustomIcon onClick={() => pcManager.repeatTrack()}>
            {repeat !== RepeatEnum.One && (
              <TbRepeat
                size={iconSize}
                color={repeat !== RepeatEnum.Off ? '#1FDF64' : ''}
                strokeWidth={2}
              />
            )}
            {repeat === RepeatEnum.One && (
              <TbRepeatOnce size={iconSize} color={'#1FDF64'} strokeWidth={2} />
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
    <ActionIcon size={size || 'lg'} onClick={onClick} variant={'transparent'} radius={'xl'}>
      {children}
    </ActionIcon>
  )
}
