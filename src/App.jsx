import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import { Flowbite, Navbar } from 'flowbite-react'
import { GiMagicPortal, GiMagicPalm } from "react-icons/gi";
import { SiLinkedin, SiGithub, SiBehance } from "react-icons/si";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import Entrada from './components/Entrada'
import Sobre from './components/Sobre'
import Login from './components/Login'
import AuthMethods from './services/auth.js'
import './App.css'

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function Layout({ children }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const showNavAndFooter = location.pathname !== "/login";
  const authMethods = new AuthMethods();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await authMethods.signOut();
      // Navigation will be handled by the ProtectedRoute component
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      {showNavAndFooter && (
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
              {user && (
                <div className="flex items-center gap-4 mr-4">
                  <span className="text-white text-sm hidden md:block">
                    Olá, {user.displayName || user.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="text-white hover:text-gray-300 text-sm underline"
                  >
                    Sair
                  </button>
                </div>
              )}
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
      )}
      <div className="min-h-screen bg-surface pt-20">
        {children}
      </div>
      {showNavAndFooter && (
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
      )}
    </>
  );
}

function App() {
  return (
    <Flowbite>
      <BrowserRouter basename="/vite-project">
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Entrada />
              </ProtectedRoute>
            } />
            <Route path="/sobre" element={
              <ProtectedRoute>
                <Sobre />
              </ProtectedRoute>
            } />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Flowbite>
  );
}

export default App
