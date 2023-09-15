import { Global, css } from '@emotion/react'
import { useMantineTheme } from '@mantine/core'

export default function GStyles() {
  const theme = useMantineTheme()
  return <Global styles={css``} />
}
