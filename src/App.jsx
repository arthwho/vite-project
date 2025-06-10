import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Flowbite, Navbar } from 'flowbite-react'
import Entrada from './components/Entrada'
import Sobre from './components/Sobre'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  return (
    <Flowbite>
      <BrowserRouter>
        <Navbar fluid rounded className="fixed top-0 left-0 right-0 w-full z-50 bg-surface p-4">
          <Navbar.Toggle />
          <Navbar.Collapse className="flex justify-center w-full">
            <Navbar.Link as={Link} to="/" active>
              Consultar
            </Navbar.Link>
            <Navbar.Link as={Link} to="/sobre">
              História
            </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
        <div className="min-h-screen bg-surface pt-20">
          <Routes>
            <Route path="/" element={<Entrada />} />
            <Route path="/sobre" element={<Sobre />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Flowbite>
  );
}

export default App
