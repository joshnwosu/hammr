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
      <Flex align={'center'} gap={'md'} mb={4}>
        <CustomIcon
          onClick={() => pcManager.shuffleTrack()}
          label={shuffle ? 'Disable Shuffle' : 'Enable Shuffle'}
        >
          <TbArrowsShuffle color={shuffle ? '#1FDF64' : ''} size={iconSize} strokeWidth={2} />
        </CustomIcon>
        <CustomIcon onClick={() => pcManager.previousTrack()} label={'Previous'}>
          <TbPlayerSkipBack size={iconSize} />
        </CustomIcon>
        <CustomIcon onClick={() => pcManager.stepBackward()} label={'Step back'}>
          <TbPlayerTrackPrev size={iconSize} />
        </CustomIcon>

        <CustomIcon
          onClick={() => pcManager.togglePlaying()}
          size={'xl'}
          label={playing ? 'Pause' : 'Play'}
        >
          {playing ? (
            <TbPlayerPause size={'2rem'} strokeWidth={2} />
          ) : (
            <TbPlayerPlay size={'2rem'} strokeWidth={2} />
          )}
        </CustomIcon>
        <CustomIcon onClick={() => pcManager.previousTrack()} label={'Step forward'}>
          <TbPlayerTrackNext size={iconSize} />
        </CustomIcon>
        <CustomIcon onClick={() => pcManager.stepBackward()} label={'Nest'}>
          <TbPlayerSkipForward size={iconSize} />
        </CustomIcon>
        <CustomIcon onClick={() => pcManager.repeatTrack()} label={`Repeat ${repeat}`}>
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
      </Flex>
      <Seek />
    </Flex>
  )
}

interface CustomIconProps {
  children: React.ReactNode | any
  size?: MantineSize | number
  onClick?: () => void
  label?: string
}

function CustomIcon({ children, size, onClick, label }: CustomIconProps) {
  return (
    <Tooltip
      label={label}
      styles={(theme) => ({
        tooltip: {
          backgroundColor: theme.colors.dark[7],
          color: theme.colors.gray[2]
        }
      })}
    >
      <ActionIcon size={size || 'lg'} onClick={onClick} variant={'transparent'} radius={'xl'}>
        {children}
      </ActionIcon>
    </Tooltip>
  )
}
