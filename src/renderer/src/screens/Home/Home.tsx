import { Text } from '@mantine/core'
import { Link, Outlet } from 'react-router-dom'

import { Allotment } from 'allotment'

const Home = () => {
  return (
    <div style={{ height: 400 }}>
      <Link to={'tracks'}>Go to 404</Link>
      <Text>Home</Text>

      {/* <Allotment vertical={false}>
        <Allotment.Pane minSize={100}>
          <p>Side Bar yoo</p>
        </Allotment.Pane>
        <Allotment.Pane>
          <p>Lorem Ipsum</p>
        </Allotment.Pane>
        <Allotment.Pane minSize={200}>
          <p>Now Playing</p>
        </Allotment.Pane>
      </Allotment> */}
      <Outlet />
    </div>
  )
}

export default Home
