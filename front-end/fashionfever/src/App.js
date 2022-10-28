import React from 'react'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { GenImage } from './pages/GenImage'
import { ImgPage } from './pages/ImgPage'
import { Profile } from './pages/Profile'
import { Images } from './pages/Images'
import { CreateAd } from './pages/Createad'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Navbar from './components/Navbar'
import { Provider } from 'react-redux'
import { store } from './store'
import { Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'
import { useLocation } from 'react-router-dom'

const Main = () => {
  const location = useLocation();

  return (
    <>
      {
        location.pathname !== "/Login" && location.pathname !== "/Register" && <Navbar/>
      }
      <Routes>
        <Route path='Home' element={<Home />} />
        <Route path='Login' element={<Login />} />
        <Route path='Register' element={<Register />} />
        <Route path='GenImage' element={<GenImage />} />
        <Route path='ImgPage' element={<ImgPage />} />
        <Route path='Profile' element={<Profile />} />
        <Route path='Images' element={<Images />} />
        <Route path='Createad' element={<CreateAd />} />
        <Route path="/" element={<Navigate replace to="/Home" />} />
      </Routes>
    </>
  )
}

const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Main/>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App