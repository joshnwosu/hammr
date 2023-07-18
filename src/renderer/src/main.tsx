import ReactDOM from 'react-dom/client'
import './assets/index.css'
import App from './App'
import { MantineProvider } from '@mantine/core'
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom'
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb'

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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/tracks',
    element: <Tracks />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>
    <RouterProvider router={router} />
    {/* <App /> */}
  </MantineProvider>
)
