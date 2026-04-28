import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/layout/Footer'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Marketplace from './pages/Marketplace'
import Repair from './pages/Repair'
import Sell from './pages/Sell'
import Signup from './pages/Signup'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="relative min-h-screen w-full">
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route
                  path="/marketplace"
                  element={
                    <ProtectedRoute>
                      <Marketplace />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/sell"
                  element={
                    <ProtectedRoute>
                      <Sell />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/repair"
                  element={
                    <ProtectedRoute>
                      <Repair />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
