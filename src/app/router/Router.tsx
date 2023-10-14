import { Authorization } from '@pages/authorization/Authorization'
import { Registration } from '@pages/registration/Registration'
import { Chat } from '@pages/chat/Chat'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAppSelector } from '@shared/hooks'


const Router: React.FC = () => {
  const isAuth = useAppSelector(state => state.ProfileReducer.isAuth)
  return (
    <BrowserRouter>
      {isAuth
        ?
        <Routes>
          <Route path='/' element={<Chat />} />
          <Route path='/*' element={<Chat />} />
        </Routes>
        :
        <Routes>
          <Route path='/authorization' element={<Authorization />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/*' element={<Authorization />} />
        </Routes>
      }
    </BrowserRouter>
  )
}

export default Router
