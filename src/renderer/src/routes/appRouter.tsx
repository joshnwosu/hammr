import NotFound from '@renderer/404-page'
import Layout from '@renderer/components/Layout/Layout'
import Search from '@renderer/screens/Search/Search'
import Tracks from '@renderer/screens/Tracks/Tracks'
import { Route, Routes } from 'react-router-dom'

export default function () {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Tracks />} />
          <Route path="search" element={<Search />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
