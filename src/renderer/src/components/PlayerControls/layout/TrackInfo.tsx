import { ActionIcon, Center, Flex, Image, Text, Tooltip } from '@mantine/core'
import pcManager from '@renderer/core/PlayerControlManager'
import { usePlayerStore } from '@renderer/store/playerStore/playerStore'
import { TbHeart } from 'react-icons/tb'

export default function TrackInfo() {
  const { playerStatus, trackFile } = usePlayerStore((state) => state)

  const { albumArt, title, artist } = playerStatus.nowPlaying

  return (
    <Flex
      style={{
        height: '100%'
      }}
      align={'center'}
      justify={'flex-start'}
      gap={'md'}
    >
      {trackFile && (
        <>
          {albumArt ? (
            <Image width={60} height={60} radius="md" src={albumArt} fit="cover" alt="Album Art" />
          ) : (
            <></>
          )}

          <Center>
            <div>
              <Text fz={'sm'} fw={400} color="white">
                {title}
              </Text>
              <Text size={'12px'} fw={600} color="dimmed" mt={2}>
                {artist}
              </Text>
            </div>
          </Center>

          <Tooltip label={'Add to favorites'} fz={'xs'} fw={600}>
            <ActionIcon
              variant="default"
              size={'lg'}
              radius={'xl'}
              //   onClick={() => pcManager.stepBackward()}
            >
              <TbHeart size={'1rem'} strokeWidth={2} />
            </ActionIcon>
          </Tooltip>
        </>
      )}
    </Flex>
  )
}
