import { Text } from '@mantine/core'
import { Link } from 'react-router-dom'

import { Allotment } from 'allotment'
import 'allotment/dist/style.css'

const Home = () => {
  return (
    <div style={{ height: 400 }}>
      <Link to={'tracks'}>Go to Tracks</Link>
      <Text>Home</Text>

      <Allotment vertical={false}>
        <Allotment.Pane minSize={100}>
          <p>Side Bar</p>
        </Allotment.Pane>
        <Allotment.Pane>
          <p>Lorem Ipsum</p>
        </Allotment.Pane>
        <Allotment.Pane minSize={200}>
          <p>Now Playing</p>
        </Allotment.Pane>
      </Allotment>
    </div>
  )
}

export default Home
