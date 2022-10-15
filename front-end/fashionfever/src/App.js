import React from 'react'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
// import { Temp } from './components/temp'

const App = () => {
  return (
    <>
      {/* <Register/> */}
      {/* <Login/> */}
      {/* <Home/> */}

      {/* <Temp/> */}

      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='Login' element={<Login />} />
          <Route path='Register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App