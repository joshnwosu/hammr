import { Button } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Oops! 404</h1>

      <Button onClick={() => navigate(-1)}>Go Back</Button>
    </div>
  )
}
