import { TbChevronLeft, TbChevronRight } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

const Tracks = () => {
  const navigation = useNavigate()
  return (
    <div>
      <TbChevronLeft onClick={() => navigation(-1)} />
      <TbChevronRight onClick={() => navigation(+1)} />
      This is where the tracks lies.
    </div>
  )
}

export default Tracks
