import { Container, Text } from '@mantine/core'
import { DragDropContext } from 'react-beautiful-dnd'

function App(): JSX.Element {
  return (
    <Container>
      <DragDropContext onDragEnd={() => console.log('End')}>
        <Text>Hello world!</Text>
      </DragDropContext>
    </Container>
  )
}

export default App
