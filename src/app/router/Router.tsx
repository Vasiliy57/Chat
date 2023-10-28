import { Authorization } from '@pages/authorization/Authorization'
import { Registration } from '@pages/registration/Registration'
import { Chat } from '@pages/chat/Chat'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAppSelector } from '@shared/hooks'
import { Profile } from '@pages/profile/Profile'
import { Routing } from '@shared/constants'

const Router: React.FC = () => {
  const isAuth = useAppSelector((state) => state.ProfileReducer.isAuth)
  return (
    <BrowserRouter>
      {isAuth ? (
        <Routes>
          <Route path={Routing.CHAT} element={<Chat />} />
          <Route path={Routing.PROFILE} element={<Profile />} />
          <Route path="/*" element={<Chat />} />
        </Routes>
      ) : (
        <Routes>
          <Route path={Routing.AUTHORIZATION} element={<Authorization />} />
          <Route path={Routing.REGISTRATION} element={<Registration />} />
          <Route path="/*" element={<Authorization />} />
        </Routes>
      )}
    </BrowserRouter>
  )
}

export default Router
