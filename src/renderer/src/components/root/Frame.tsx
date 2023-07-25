import { ActionIcon, Group, createStyles, Tooltip } from '@mantine/core'
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
  right: {},
  windowBtn: {
    width: 50,
    height: '100%',
    cursor: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ':hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]
    }
  },
  windowBtnClose: {
    width: 50,
    height: '100%',
    cursor: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ':hover': {
      backgroundColor: theme.colors.red[9]
    }
  }
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
          <Tooltip label="Minimize">
            <div className={classes.windowBtn}>
              <VscChromeMinimize />
            </div>
          </Tooltip>
          <Tooltip label="Restore Down">
            <div className={classes.windowBtn}>
              <VscChromeRestore />
            </div>
          </Tooltip>

          <Tooltip label="Close">
            <div className={classes.windowBtnClose}>
              <VscChromeClose />
            </div>
          </Tooltip>
        </Group>
      </Group>
    </div>
  )
}
