import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Entrada from './components/Entrada'
import Sobre from './components/Sobre'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Entrada />} />
          <Route path="/sobre" element={<Sobre />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
