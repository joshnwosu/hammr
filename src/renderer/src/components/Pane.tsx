import { Box, Flex, Paper, Text, createStyles } from '@mantine/core'
import { Allotment } from 'allotment'
import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar'
import NowPlaying from './NowPlaying/NowPlaying'
import { Frame } from './Frame/Frame'
import Controls from './Controls/Controls'
import IpcListener from './IpcListener/IpcListener'

const useStyes = createStyles((theme) => ({
  wrapper: {
    width: '100%',
    height: '100vh',
    backgroundColor: theme.black
  },

  inner: {
    flex: 1
  },
  box: {
    flex: 1
  },
  scene: {
    backgroundColor: '#111111',
    height: '100%'
  }
}))

export default function Pane() {
  const { classes } = useStyes()
  return (
    <Flex className={classes.wrapper} direction={'column'}>
      <Frame />
      <IpcListener />
      <Flex direction={'column'} className={classes.inner}>
        <Box className={classes.box}>
          <Allotment>
            <Allotment.Pane minSize={100} maxSize={400}>
              <Flex p={'sm'} direction={'column'} gap={'sm'} h={'100%'}>
                <Navbar />
                <Sidebar />
              </Flex>
            </Allotment.Pane>
            <Allotment.Pane>
              <Allotment>
                <Allotment.Pane>
                  <Box p={'sm'} h={'100%'}>
                    <Paper radius={'md'} p={'md'} className={classes.scene}>
                      <Text>Nowplaying</Text>
                    </Paper>
                  </Box>
                </Allotment.Pane>
                <Allotment.Pane maxSize={400} minSize={300}>
                  <Box p={'sm'} h={'100%'}>
                    <NowPlaying />
                  </Box>
                </Allotment.Pane>
              </Allotment>
            </Allotment.Pane>
          </Allotment>
        </Box>
        <Controls />
      </Flex>
    </Flex>
  )
}
