import { usePlayerStore } from '@renderer/store/playerStore'
import { useEffect } from 'react'
// import { TbChevronLeft, TbChevronRight } from 'react-icons/tb'
// import { useNavigate } from 'react-router-dom'

const Tracks = () => {
  // const navigation = useNavigate()

  const { tracks, setSelectedTrack, setNowPlaying } = usePlayerStore((state) => state)

  useEffect(() => {
    console.log('Tracks: ', tracks)
  }, [])

  return (
    <div>
      {/* <TbChevronLeft onClick={() => navigation(-1)} />
      <TbChevronRight onClick={() => navigation(+1)} /> */}
      This is where the tracks lies.
      <div>
        {tracks.map((item, index) => {
          return (
            <div key={index}>
              <p
                onClick={() => {
                  setSelectedTrack(item.fileLocation)
                  setNowPlaying(item)
                }}
              >
                {item.title}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Tracks
