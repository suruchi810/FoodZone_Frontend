import { Routes, Route } from 'react-router-dom'
import './App.css'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Navbar from './components/Navbar'
import ExploreMenu from './pages/ExploreMenu'
import Home from './pages/Home'
import Footer from './components/Footer'
import CartPage from './pages/CartPage'
import CheckoutPage from './components/CheckoutPage'
import Verify from './pages/Verify'
import Myorders from './pages/Myorders'

function App() {
  const [showLogin, setShowLogin] = useState("");

  useEffect(()=>{
  }, [showLogin])

  return (
    <>
      <ToastContainer/>
      <Navbar showLogin={showLogin} setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home showLogin={showLogin} setShowLogin={setShowLogin}/>}/>
        <Route path='/menu' element={<ExploreMenu/>}/>
        <Route path='/cart' element={<CartPage showLogin={showLogin} setShowLogin={setShowLogin}/>}/>
        <Route path='/checkout' element={<CheckoutPage/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorder' element={<Myorders/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
