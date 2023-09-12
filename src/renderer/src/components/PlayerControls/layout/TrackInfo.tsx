import { Center, Flex, Image, Text } from '@mantine/core'
import { usePlayerStore } from '@renderer/store/playerStore/playerStore'

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
    >
      {trackFile && (
        <>
          {albumArt ? (
            <Image
              width={60}
              height={60}
              radius="md"
              src={albumArt}
              fit="cover"
              alt="Album Art"
              mr={'xl'}
            />
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
        </>
      )}
    </Flex>
  )
}
