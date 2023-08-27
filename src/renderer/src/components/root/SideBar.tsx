import { Button, ColSpan, Text, Tooltip } from '@mantine/core'
import { useState } from 'react'

export default function SideBar() {
  const [navbarSize, setNavbarSize] = useState<ColSpan>(2)
  return (
    <div>
      <Text>Navbar component</Text>
      <Tooltip label="Expand">
        <Button
          onClick={() => {
            if (navbarSize === 2) setNavbarSize('auto')
            else setNavbarSize(2)
          }}
        >
          Expand
        </Button>
      </Tooltip>
    </div>
  )
}
