import { Text } from '@mantine/core'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Link to={'tracks'}>Go to Tracks</Link>
      <Text>Home</Text>
    </div>
  )
}

export default Home
