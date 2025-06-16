import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Flowbite, Navbar } from 'flowbite-react'
import { GiMagicPortal, GiMagicPalm } from "react-icons/gi";
import { SiLinkedin, SiGithub, SiBehance } from "react-icons/si";
import Entrada from './components/Entrada'
import Sobre from './components/Sobre'
import './App.css'

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Flowbite>
      <BrowserRouter basename="/vite-project">
        <Navbar fluid rounded className="fixed top-0 left-0 right-0 w-full z-50 bg-surface p-4">
          <div className="flex justify-between items-center w-full">
            <div className="flex-1"></div>
            <Navbar.Collapse className={`flex justify-center bg-neutral-700 rounded-full ${isOpen ? 'block' : 'hidden md:flex'}`}>
              <Navbar.Link as={Link} to="/" active className="transition-colors duration-200 rounded-full [&>span]: custom-nav-link flex items-center" style={{ padding: '6px 14px'}}>
                <GiMagicPalm className="mr-2 h-5 w-5" />
                Consultar
              </Navbar.Link>
              <Navbar.Link as={Link} to="/sobre" className="transition-colors duration-200 rounded-full [&>span]: custom-nav-link flex items-center" style={{ padding: '6px 14px' }}>
                <GiMagicPortal className="mr-2 h-5 w-5" />
                História do Oráculo
              </Navbar.Link>
            </Navbar.Collapse>
            <div className="flex-1 flex justify-end">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
              </button>
            </div>
          </div>
        </Navbar>
        <footer className="fixed bottom-0 left-0 right-0 p-4 text-sm text-gray-500 flex justify-between items-center">
          <p>Oráculo v1.0.0</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/arthwho" target="_blank" rel="noopener noreferrer">
              <SiGithub className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/arthur-ferreira-coelho/" target="_blank" rel="noopener noreferrer">
              <SiLinkedin className="h-5 w-5" />
            </a>
            <a href="https://www.behance.net/arthur-ferreira" target="_blank" rel="noopener noreferrer">
              <SiBehance className="h-5 w-5" />
            </a>
          </div>
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
