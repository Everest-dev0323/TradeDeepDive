import { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ManageCookieModal from './components/desktop/ManageCookieModal'
import SettingCookieModal from './components/desktop/SettingCookieModal'

import Home from './pages/Home'
import Main from './pages/Main'
import AboutUs from './pages/AboutUs'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/opt-in" element={<Main />} />
          <Route path='/about-us' element={<AboutUs />} />
        </Routes>
        <SettingCookieModal />
        <ManageCookieModal />
      </BrowserRouter>
    </>
  )
}

export default App
