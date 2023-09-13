import { Box, Center, Flex, Image, Text, createStyles } from '@mantine/core'
import { usePlayerStore } from '@renderer/store/playerStore/playerStore'

const useStyles = createStyles(() => ({
  wrapper: {
    width: '25%'
  }
}))

export default function CurrentTrack() {
  const { classes } = useStyles()
  const { playerStatus, trackFile } = usePlayerStore((state) => state)
  const { albumArt, title, artist } = playerStatus.nowPlaying
  return (
    <Flex className={classes.wrapper}>
      {trackFile && (
        <>
          {trackFile && (
            <Image
              width={60}
              height={60}
              radius="md"
              src={albumArt}
              fit="cover"
              alt="Album Art"
              mr={'xl'}
            />
          )}
          <Center>
            <Box>
              <Text fz={'sm'} fw={400} color="white">
                {title}
              </Text>
              <Text size={'12px'} fw={600} color="dimmed" mt={2}>
                {artist}
              </Text>
            </Box>
          </Center>
        </>
      )}
    </Flex>
  )
}
