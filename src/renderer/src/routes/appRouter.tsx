import NotFound from '@renderer/404-page'
import Home from '@renderer/screens/Home/Home'
import Tracks from '@renderer/screens/Tracks/Tracks'
import { Route, Routes } from 'react-router-dom'

export default function () {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Tracks />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
