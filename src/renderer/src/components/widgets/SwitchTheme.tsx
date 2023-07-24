import { Switch, Group, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { TbSun, TbMoonStars } from 'react-icons/tb'

export function SwitchToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()

  return (
    <Group position="center">
      <Switch
        checked={colorScheme === 'dark'}
        onChange={() => {
          toggleColorScheme()
        }}
        size="lg"
        onLabel={<TbSun color={theme.white} size="1.25rem" />}
        offLabel={<TbMoonStars color={theme.colors.gray[6]} size="1.25rem" />}
      />
    </Group>
  )
}
