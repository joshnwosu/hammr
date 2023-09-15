import { Flex, Paper, Text, createStyles } from '@mantine/core'
import { TbHome2, TbSearch } from 'react-icons/tb'
import { Link } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: '#111111',
    padding: theme.spacing.sm
  },

  links: {
    flexDirection: 'column'
  },

  link: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing.sm,
    color: theme.colors.gray[3],
    textDecoration: 'none',
    gap: theme.spacing.md,

    '&:hover': {
      color: theme.white
    }
  }
}))

const links = [
  { label: 'Home', href: '/', icon: TbHome2 },
  { label: 'Search', href: 'search', icon: TbSearch }
]

export default function Navbar() {
  const { classes } = useStyles()
  return (
    <Paper className={classes.wrapper} radius={'md'}>
      <Flex className={classes.links}>
        {links.map((link, index) => (
          <Link to={link.href} className={classes.link} key={index}>
            <link.icon size={'1.7rem'} strokeWidth={1.5} />
            <Text fw={700} mb={-5}>
              {link.label}
            </Text>
          </Link>
        ))}
      </Flex>
    </Paper>
  )
}
