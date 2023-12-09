import Router from './router/Router'
import { StoreProvider } from './provider'
import { ToastContainer } from 'react-toastify'

import './style/null-style.css'
import './style/base-style.css'
import 'react-toastify/dist/ReactToastify.css'

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <StoreProvider>
        <Router />
      </StoreProvider>
    </>
  )
}

export default App
