import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Flowbite, Navbar } from 'flowbite-react'
import { GiMagicPortal, GiMagicPalm } from "react-icons/gi";
import Entrada from './components/Entrada'
import Sobre from './components/Sobre'
import './App.css'

function App() {
  return (
    <Flowbite>
      <BrowserRouter>
        <Navbar fluid rounded className="fixed top-0 left-0 right-0 w-full z-50 bg-surface p-4 ">
          <div className="flex justify-between items-center w-full">
            <div className="flex-1"></div>
            <Navbar.Collapse className="flex justify-center bg-neutral-700 p-2 rounded-3xl">
              <Navbar.Link as={Link} to="/" active className="transition-colors duration-200 rounded-2xl [&>span]:p-4 custom-nav-link flex items-center" style={{ padding: '8px' }}>
                <GiMagicPalm className="mr-2 h-5 w-5" />
                Consultar
              </Navbar.Link>
              <Navbar.Link as={Link} to="/sobre" className="transition-colors duration-200 rounded-2xl [&>span]:p-4 custom-nav-link flex items-center" style={{ padding: '8px' }}>
                <GiMagicPortal className="mr-2 h-5 w-5" />
                História do Oráculo
              </Navbar.Link>
            </Navbar.Collapse>
            <div className="flex-1 flex justify-end">
              <Navbar.Toggle />
            </div>
          </div>
        </Navbar>
        <footer className="fixed bottom-0 left-0 right-0 p-4 text-sm text-gray-500">
          <p>Oráculo v1.0.0</p>
        </footer>
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
