import { Flex, Navbar, Paper, createStyles, getStylesRef } from '@mantine/core'
import { Link } from 'react-router-dom'
import { links } from './data'
import { useState } from 'react'

const useStyles = createStyles((theme) => ({
  wrapper: {
    width: 280,
    backgroundColor: theme.black,
    display: 'flex',
    height: '100%',
    border: 'none',
    paddingTop: 30
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `10px 0`,
    fontWeight: 500,
    position: 'relative',

    '&:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black
      }
    }
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    marginRight: theme.spacing.sm
  },

  linkActive: {
    '&, &:hover': {
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color
      }
    }
  },

  shape: {
    width: 4,
    height: 35,
    backgroundColor: theme.primaryColor,
    marginRight: 10,
    opacity: 0
  },

  shapeActive: {
    opacity: 1
  }
}))

export default function Sidebar() {
  const { classes, cx } = useStyles()
  const [active, setActive] = useState('Tracks')
  return (
    <>
      <Navbar className={classes.wrapper}>
        <Navbar.Section>
          {links.map((link) => (
            <Link
              to={link.link}
              onClick={() => {
                setActive(link.label)
              }}
              className={cx(classes.link, { [classes.linkActive]: link.label === active })}
            >
              <Paper
                className={cx(classes.shape, { [classes.shapeActive]: link.label === active })}
              />
              <Flex gap={'0'} align={'center'}>
                <link.icon className={classes.linkIcon} strokeWidth={1.5} size={25} />
                {link.label}
              </Flex>
            </Link>
          ))}
        </Navbar.Section>
      </Navbar>
    </>
  )
}
