import { AuthProvider } from './providers/auth'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import VitePage from './pages/VitePage'
import TestPage from './pages/TestPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/transactions" element={<TestPage />} />
            <Route path="/vite" element={<VitePage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
