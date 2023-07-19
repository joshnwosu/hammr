import ReactDOM from 'react-dom/client'
import './assets/index.css'
import App from './App'
import { MantineProvider } from '@mantine/core'
import 'allotment/dist/style.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>
    <App />
  </MantineProvider>
)
