import { ActionIcon, Group, createStyles, Tooltip, UnstyledButton } from '@mantine/core'
import React, { useEffect, useState } from 'react'
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
    ':hover:not(:last-child)': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]
    },

    ':last-child': {
      ':hover': {
        backgroundColor: theme.colors.red[9],
        color: 'white'
      }
    }
  }
}))

export const Frame = () => {
  const { classes } = useStyles()
  const [isMaximize, setIsMaximize] = useState(null)

  const actionButtons = [
    {
      type: 'minimize',
      label: 'Minimize',
      icon: VscChromeMinimize
    },
    // {
    //   label: 'restore down',
    //   icon: VscChromeRestore
    // },
    {
      type: 'maximize',
      label: isMaximize ? 'Restore Down' : 'Maximize',
      icon: isMaximize ? VscChromeRestore : VscChromeMaximize
    },
    {
      type: 'close',
      label: 'Close',
      icon: VscChromeClose
    }
  ]

  useEffect(() => {
    window.api.receive('isMaximize', (_, value) => {
      setIsMaximize(value)
    })
  }, [])

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
          {actionButtons.map((item, index) => (
            <Tooltip
              key={index.toString()}
              label={item.label}
              styles={(theme) => ({
                tooltip: {
                  fontSize: theme.spacing.sm,
                  textTransform: 'capitalize'
                }
              })}
            >
              <UnstyledButton
                className={classes.windowBtn}
                onClick={() => window.api.send('frame', item.type)}
              >
                {React.createElement(item.icon, {
                  strokeWidth: '0.1',
                  size: '1rem'
                })}
              </UnstyledButton>
            </Tooltip>
          ))}
        </Group>
      </Group>
    </div>
  )
}
