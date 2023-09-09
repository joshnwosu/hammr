import { Button } from '@mantine/core'
import pcManager from '@renderer/components/PlayerControls/PlayerControlManager'
import { usePlayerStore } from '@renderer/store/playerStore'
import trackUtils from '@renderer/utils/TrackUtils'
// import { TbChevronLeft, TbChevronRight } from 'react-icons/tb'
// import { useNavigate } from 'react-router-dom'

const Tracks = () => {
  // const navigation = useNavigate()

  const { tracks, setNowPlaying } = usePlayerStore((state) => state)

  return (
    <div>
      {/* <TbChevronLeft onClick={() => navigation(-1)} />
      <TbChevronRight onClick={() => navigation(+1)} /> */}
      This is where the tracks lies.
      <div>
        {tracks.map((track, index) => {
          return (
            <div key={index}>
              <p
                onClick={() => {
                  pcManager.selectedTrack(track.r_fileLocation, tracks)
                  // pcManager.setTracksAndPlay(tracks, track.r_fileLocation)
                }}
              >
                {track.title}
              </p>
            </div>
          )
        })}
      </div>
      <div>
        <Button onClick={() => pcManager.nextTrack()}>Next</Button>
      </div>
    </div>
  )
}

export default Tracks
