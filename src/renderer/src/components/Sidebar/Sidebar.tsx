import {
  ActionIcon,
  Avatar,
  Box,
  Flex,
  Group,
  Paper,
  Text,
  Tooltip,
  UnstyledButton,
  createStyles
} from '@mantine/core'
import {
  TbArrowRight,
  TbBooks,
  TbFolder,
  TbHeartFilled,
  TbMusic,
  TbPinFilled,
  TbPlus
} from 'react-icons/tb'

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: '#111111',
    flex: 1
  },

  item: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.xs}`,
    borderRadius: theme.radius.md,
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0]
    }
  },

  iconWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  icon: {
    color: theme.colors.gray[3]
  }
}))

const items = [
  {
    label: 'Liked Songs',
    icon: TbHeartFilled,
    length: 203,
    pinned: true,
    src: null,
    type: 'playlist'
  },
  {
    label: 'Top Playlist Folder',
    icon: TbFolder,
    length: 4,
    pinned: true,
    src: null,
    type: 'folder'
  },
  {
    label: 'Folder Playlist',
    icon: TbFolder,
    length: 0,
    pinned: false,
    src: null,
    type: 'folder'
  },
  {
    label: 'Dope Playlist 2023',
    icon: TbMusic,
    length: 83,
    pinned: false,
    src: null,
    type: 'playlist'
  }
]

export default function Sidebar() {
  const { classes } = useStyles()
  return (
    <Paper className={classes.wrapper} radius={'md'} p={'xs'}>
      <Flex justify={'space-between'} px={'sm'} mb={'md'}>
        <UnstyledButton>
          <Group>
            <TbBooks size={'2rem'} strokeWidth={1.5} />
            <Text size={'lg'} fw={600}>
              Your Library
            </Text>
          </Group>
        </UnstyledButton>
        <Flex gap={'xs'}>
          <Tooltip label={`Create playlist or folder`} className={classes.icon}>
            <ActionIcon size={'lg'} radius={'xl'}>
              <TbPlus size={'1.3rem'} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={`Show more`}>
            <ActionIcon size={'lg'} radius={'xl'}>
              <TbArrowRight size={'1.3rem'} />
            </ActionIcon>
          </Tooltip>
        </Flex>
      </Flex>
      <Box>
        {items.map((item, index) => (
          <UnstyledButton className={classes.item} key={index}>
            <Group>
              <Avatar size={'lg'}>
                <item.icon size={'1.8rem'} strokeWidth={1.5} />
              </Avatar>
              <div>
                <Text>{item.label}</Text>
                <Group spacing={'xs'}>
                  {item.pinned && <TbPinFilled size={'1.2rem'} />}
                  <Text size="sm" color="dimmed">
                    {item.length} {item.type === 'playlist' ? 'songs' : 'playlist'}
                  </Text>
                </Group>
              </div>
            </Group>
          </UnstyledButton>
        ))}
      </Box>
    </Paper>
  )
}
