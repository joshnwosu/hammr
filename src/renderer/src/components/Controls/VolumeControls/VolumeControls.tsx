import { ActionIcon, Flex, Slider, Tooltip, createStyles, rem } from '@mantine/core'
import pcManager from '@renderer/core/PlayerControlManager'
import { useAppStore } from '@renderer/store/appStore/appStore'
import { usePlayerStore } from '@renderer/store/playerStore/playerStore'
import {
  IoVolumeHighOutline,
  IoVolumeLowOutline,
  IoVolumeMediumOutline,
  //   IoVolumeMuteOutline,
  IoVolumeOffOutline
} from 'react-icons/io5'
import { TbLayoutSidebarRightExpand } from 'react-icons/tb'

const useStyles = createStyles(() => ({
  wrapper: {
    width: '25%'
  }
}))

export default function VolumeControls() {
  const { classes } = useStyles()
  const { playerStatus } = usePlayerStore((state) => state)
  const { toggleNowPlayingView, nowPlayingView } = useAppStore((state) => state)
  const { volume } = playerStatus

  const handleShowNowPlaying = () => {
    toggleNowPlayingView(!nowPlayingView)
  }

  const VolumIcon =
    volume <= 0
      ? IoVolumeOffOutline
      : volume <= 0.1
      ? IoVolumeLowOutline
      : volume <= 0.6
      ? IoVolumeMediumOutline
      : IoVolumeHighOutline

  return (
    <Flex className={classes.wrapper} align={'center'} justify={'flex-end'} gap={'sm'}>
      <Tooltip label="Now Playing">
        <ActionIcon onClick={handleShowNowPlaying} variant="transparent" size={'lg'}>
          <TbLayoutSidebarRightExpand size={'1.2rem'} strokeWidth={1.5} />
        </ActionIcon>
      </Tooltip>
      <ActionIcon
        variant="transparent"
        size={'lg'}
        radius={'xl'}
        onClick={() => pcManager.toggleMute()}
      >
        <VolumIcon size={'1.2rem'} strokeWidth={1.5} />
      </ActionIcon>
      <Slider
        value={volume * 100}
        labelTransition="skew-down"
        labelTransitionDuration={150}
        labelTransitionTimingFunction="ease"
        label={(value) => `${value.toFixed(0)}%`}
        size={3}
        defaultValue={0.5}
        onChange={(value) => {
          pcManager.changeVolume(value / 100)
        }}
        w={100}
        styles={(theme) => ({
          track: {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.blue[1]
          },
          mark: {
            width: rem(6),
            height: rem(6),
            borderRadius: rem(6),
            transform: `translateX(-${rem(3)}) translateY(-${rem(2)})`,
            borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.blue[1]
          },
          markFilled: {
            borderColor: theme.colors.blue[6]
          },
          markLabel: { fontSize: theme.fontSizes.xs, marginBottom: rem(5), marginTop: 0 },
          thumb: {
            height: rem(16),
            width: rem(16),
            backgroundColor: theme.white,
            borderWidth: rem(1),
            boxShadow: theme.shadows.sm
          }
        })}
      />
    </Flex>
  )
}
