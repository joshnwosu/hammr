import { Box, Flex, createStyles } from '@mantine/core'
import { Link } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  wrapper: {
    width: 280,
    backgroundColor: theme.black,
    display: 'flex'
  }
}))

export default function Sidebar() {
  const { classes } = useStyles()
  return (
    <Box className={classes.wrapper}>
      <Flex direction={'column'}>
        <Link to="/">Tracks</Link>
        <Link to="search">Search</Link>
      </Flex>
    </Box>
  )
}
