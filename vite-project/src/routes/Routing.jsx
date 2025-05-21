import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from '../pages/Inicio';

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Inicio/>}></Route>
      </Routes>
    </Router>
  )
}

export default Routing