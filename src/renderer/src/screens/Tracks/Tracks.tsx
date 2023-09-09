import { Button, Slider } from '@mantine/core'
import pcManager from '@renderer/core/PlayerControlManager'
import { usePlayerStore } from '@renderer/store/playerStore/playerStore'
import trackUtils from '@renderer/utils/TrackUtils'
// import { TbChevronLeft, TbChevronRight } from 'react-icons/tb'
// import { useNavigate } from 'react-router-dom'

const Tracks = () => {
  // const navigation = useNavigate()

  const { tracks, playerStatus } = usePlayerStore((state) => state)

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
        <Button onClick={() => pcManager.shuffleTrack()}>
          Shuffle - {playerStatus.shuffle ? 'Yes' : 'No'}
        </Button>

        <Button onClick={() => pcManager.previousTrack()}>Previous</Button>

        <Button onClick={() => pcManager.nextTrack()}>Next</Button>

        <Button onClick={() => pcManager.repeatTrack()}>Repeat - {playerStatus.repeat}</Button>

        <Slider
          value={playerStatus.seekPosition || 0}
          labelTransition="skew-down"
          labelTransitionDuration={150}
          labelTransitionTimingFunction="ease"
          label={trackUtils.formatDuration(playerStatus.currentTime)}
          mt={'xl'}
          onChange={(value) => {
            pcManager.seekBar(value)
          }}
        />
      </div>
    </div>
  )
}

export default Tracks
