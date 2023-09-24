import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar, Sidebar } from './components/index'
import { Dashboard } from './pages/index'

function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="h-screen flex-1 p-7">
            <Routes>
              <Route path='/' element={<Dashboard />} />
            </Routes>
          </div>

        </div>
      </BrowserRouter>
    </>
  )
}

export default App
