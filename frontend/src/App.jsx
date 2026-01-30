import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Routes, Route } from 'react-router'

import Friends from './screens/Friends';
import Home from './screens/Home';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/friends" element={<Friends />} />
    </Routes>
  )
}

export default App
