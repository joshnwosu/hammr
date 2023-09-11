import ReactDOM from 'react-dom/client'
import './assets/index.css'
import App from './App'
import 'allotment/dist/style.css'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <App />
  </Router>
)
