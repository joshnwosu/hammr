import { ActionIcon, Group, createStyles, ChevronIcon, Tooltip } from '@mantine/core'
import { IoEllipsisHorizontal } from 'react-icons/io5'
import {
  VscChromeClose,
  VscChromeRestore,
  VscChromeMinimize,
  // @ts-ignore
  VscChromeMaximize
} from 'react-icons/vsc'

const useStyles = createStyles((theme) => ({
  frame: {
    height: 30
  },
  left: {
    WebkitAppRegion: 'drag',
    paddingLeft: theme.spacing.lg
  },
  right: {}
}))

export const Frame = () => {
  const { classes } = useStyles()
  return (
    <div className={classes.frame}>
      <Group
        position="apart"
        w={'100%'}
        h={'100%'}
        sx={(theme) => ({
          backgroundColor: theme.colorScheme == 'dark' ? theme.black : theme.colors.gray[0]
        })}
        py={0}
      >
        <div
          className={classes.left}
          style={{
            flex: 1
          }}
        >
          <ActionIcon radius={0} variant="transparent">
            <IoEllipsisHorizontal size={'1.8rem'} />
          </ActionIcon>
        </div>

        <Group spacing={0} p={0} m={0} h={'100%'}>
          <ActionIcon
            radius={0}
            w={50}
            h={'100%'}
            variant="transparent"
            title="Don't even know what this icon does."
          >
            <ChevronIcon />
          </ActionIcon>
          <Tooltip label="Minimize">
            <ActionIcon radius={0} w={50} h={'100%'} variant="transparent">
              <VscChromeMinimize />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Restore Down">
            <ActionIcon radius={0} w={50} h={'100%'} variant="transparent">
              <VscChromeRestore />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Close">
            <ActionIcon radius={0} w={50} h={'100%'} variant="transparent">
              <VscChromeClose />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
    </div>
  )
}
