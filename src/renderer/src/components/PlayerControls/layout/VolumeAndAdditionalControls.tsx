import { ActionIcon, Flex, Slider, rem } from '@mantine/core'
import pcManager from '@renderer/core/PlayerControlManager'
import { usePlayerStore } from '@renderer/store/playerStore/playerStore'
import { useEffect } from 'react'
import {
  IoVolumeHighOutline,
  IoVolumeLowOutline,
  IoVolumeMediumOutline,
  //   IoVolumeMuteOutline,
  IoVolumeOffOutline
} from 'react-icons/io5'

export default function VolumeAndAdditionalControls() {
  const { playerStatus } = usePlayerStore((state) => state)

  const { volume } = playerStatus

  useEffect(() => {
    console.log(volume)
  }, [volume])

  return (
    <Flex
      style={{
        height: '100%'
      }}
      align={'center'}
      justify={'flex-end'}
      gap={'sm'}
    >
      <ActionIcon
        variant="default"
        size={'lg'}
        radius={'xl'}
        onClick={() => pcManager.repeatTrack()}
      >
        {volume <= 0 ? (
          <IoVolumeOffOutline size={'1rem'} strokeWidth={2} />
        ) : volume <= 0.1 ? (
          <IoVolumeLowOutline size={'1rem'} strokeWidth={2} />
        ) : volume <= 0.6 ? (
          <IoVolumeMediumOutline size={'1rem'} strokeWidth={2} />
        ) : (
          <IoVolumeHighOutline size={'1rem'} strokeWidth={2} />
        )}
      </ActionIcon>
      <Slider
        value={volume * 100}
        labelTransition="skew-down"
        labelTransitionDuration={150}
        labelTransitionTimingFunction="ease"
        label={(value) => `${value.toFixed(0)}%`}
        size={2}
        defaultValue={0.5}
        onChange={(value) => {
          pcManager.changeVolume(value / 100)
        }}
        w={150}
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
