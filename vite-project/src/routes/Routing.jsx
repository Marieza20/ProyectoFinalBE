import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from '../components/Footer'

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Footer/>}></Route>
      </Routes>
    </Router>
  )
}

export default Routing