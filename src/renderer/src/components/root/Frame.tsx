import { ActionIcon, Group, createStyles } from '@mantine/core'
import { IoEllipsisHorizontal } from 'react-icons/io5'
import {
  VscChromeClose,
  VscChromeRestore,
  VscChromeMinimize,
  // @ts-ignore
  VscChromeMaximize
} from 'react-icons/vsc'

const useStyles = createStyles(() => ({
  right: {
    WebkitAppRegion: 'drag',
    height: 30
  }
}))

export const Frame = () => {
  const { classes } = useStyles()
  return (
    <div className={classes.right}>
      <Group
        position="apart"
        h={'100%'}
        sx={(theme) => ({
          backgroundColor: theme.colorScheme == 'dark' ? theme.black : theme.colors.gray[0]
        })}
        pl={'md'}
        py={0}
      >
        <ActionIcon radius={0} variant="transparent">
          <IoEllipsisHorizontal size={'1.8rem'} />
        </ActionIcon>

        <Group spacing={0} grow p={0} m={0} h={'100%'}>
          <ActionIcon radius={0} w={50} h={'100%'} variant="transparent">
            <VscChromeMinimize />
          </ActionIcon>
          <ActionIcon radius={0} w={50} h={'100%'} variant="transparent">
            <VscChromeRestore />
          </ActionIcon>
          <ActionIcon radius={0} w={50} h={'100%'} variant="transparent">
            <VscChromeClose />
          </ActionIcon>
        </Group>
      </Group>
    </div>
  )
}
