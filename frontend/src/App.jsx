import React from 'react';
import './App.css'

//Contexts
import { UserProvider } from './hooks/UserContext';
import { CartProvider } from './hooks/CartContext';

//RRD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//Components
import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import Login from './components/Login'
import Register from './components/Register'
import Cart from './components/Cart';

function App() {

  return (
    <>
      <Router>
        <UserProvider>
          <CartProvider>
            <Navbar />
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/cart' element={<Cart />} />
            </Routes>
          </CartProvider>
        </UserProvider>
      </Router >
    </>
  )
}

export default App