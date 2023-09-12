import { Button, ColSpan, Text, Tooltip } from '@mantine/core'
import { useState } from 'react'
import { TbHome2 } from 'react-icons/tb'

export default function Sidebar() {
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
      <div>
        <TbHome2 size={'5rem'} strokeWidth={1} />
      </div>
    </div>
  )
}
