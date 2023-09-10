import { Carousel, Embla } from '@mantine/carousel'
import { ActionIcon, Box, Group } from '@mantine/core'
import { useState } from 'react'
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb'

export default function Static() {
  const [embla, setEmable] = useState<Embla | null>(null)

  const handleNext = () => {
    embla?.scrollNext()
  }

  const handlePrev = () => {
    embla?.scrollPrev()
  }

  return (
    <>
      <Group>
        <ActionIcon onClick={handlePrev}>
          <TbChevronLeft />
        </ActionIcon>
        <ActionIcon onClick={handleNext}>
          <TbChevronRight />
        </ActionIcon>
      </Group>
      <Box w={400} style={{ border: '1px solid red' }}>
        <Carousel
          style={{ border: '1px solid green' }}
          maw={320}
          mx="auto"
          withIndicators
          withControls={false}
          height={200}
          getEmblaApi={setEmable}
          loop
        >
          <Carousel.Slide>1</Carousel.Slide>
          <Carousel.Slide>2</Carousel.Slide>
          <Carousel.Slide>3</Carousel.Slide>
          {/* ...other slides */}
        </Carousel>
      </Box>
    </>
  )
}
