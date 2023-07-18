import { Button, ScrollArea } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import IpcListener from './components/root/IpcListener'
import { TbSend } from 'react-icons/tb'
import { usePlayerStore } from './store/playerStore'
import PlayerControls from './components/layouts/PlayerControls'
import { Link, useNavigate } from 'react-router-dom'

interface Item {
  id: string
  content: string
}

// fake data generator
const getItems = (count: number): Item[] =>
  Array.from({ length: count }, (_, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`
  }))

const grid = 8

const getItemStyle = (isDragging: boolean, draggableStyle: any): React.CSSProperties => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle
})

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250
})

const App: React.FC = () => {
  const navigation = useNavigate()
  const [items, setItems] = useState<Item[]>(getItems(11))

  // const amount = usePlayerStore((state) => state.amount)
  // const increaseByTen = usePlayerStore((state) => state.increaseByTen)

  const { name, amount, increaseByTen, tracks, setSelectedTrack } = usePlayerStore((state) => state)

  useEffect(() => {
    console.log('From store.')
  }, [name])

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const reorderedItems = Array.from(items)
    const [removed] = reorderedItems.splice(result.source.index, 1)
    reorderedItems.splice(result.destination.index, 0, removed)

    setItems(reorderedItems)
  }

  const sendMessage = () => {
    // console.log('Send Message')
    increaseByTen(10)
  }

  return (
    <ScrollArea w={300} h={400}>
      <PlayerControls />
      <IpcListener />
      <Button onClick={sendMessage} rightIcon={<TbSend size={'1rem'} />} color="grape">
        Send Message to Main - {amount}
      </Button>

      <Link to={'tracks'}>Go to Tracks</Link>
      <Button onClick={() => navigation(+1)} color="cyan">
        Go Forward
      </Button>

      {tracks.map((item, index) => {
        return (
          <div key={index}>
            <p onClick={() => setSelectedTrack(item.fileLocation)}>{item.title}</p>
          </div>
        )
      })}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </ScrollArea>
  )
}

export default App
