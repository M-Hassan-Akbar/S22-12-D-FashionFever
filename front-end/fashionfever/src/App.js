import React from 'react'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { GenImage } from './pages/GenImage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Navbar from './components/Navbar'
import { Provider } from 'react-redux'
import { store } from './store'
import { Navigate } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='Home' element={<Home />} />
            <Route path='Login' element={<Login />} />
            <Route path='Register' element={<Register />} />
            <Route path='GenImage' element={<GenImage />} />
            <Route path="/" element={<Navigate replace to="/Home" />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App