import './App.css'
import Homepage from './components/Homepage'
import Login from './components/Login'
import Navbar from './components/Navbar'

//RRD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './components/Register'

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router >
    </>
  )
}

export default App