import { Box, Group } from '@mantine/core'
export const Frame = () => {
  return (
    <Group
      position="apart"
      h={60}
      sx={(theme) => ({
        backgroundColor: theme.colorScheme == 'dark' ? theme.black : theme.colors.gray[0]
      })}
    >
      <Box></Box>
      <Box></Box>
    </Group>
  )
}
