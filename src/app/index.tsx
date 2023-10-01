import './style/null-style.css'
import './style/base-style.css'
import Router from './router/Router'
import { StoreProvider } from './provider'

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router />
    </StoreProvider>
  )
}

export default App

