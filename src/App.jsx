import { useState } from 'react'
import useBooks from './components/UseBooks';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from './components/Login';


import Home from "./pages/Home";
import BestSeller from "./pages/BestSeller";
import Novedades from "./pages/Novedades";

function App() {

  return (

        <Router>
          <Header/>
                <Container>
                  <Routes>
                    <Route path="/" element={<Home/>} />
                     <Route path="/administracion" element={<Login />} />
                     
                    <Route path="/BestSeller" element={<BestSeller/>} />

                    <Route path="/Novedades" element={<Novedades/>} />

                  </Routes>
                </Container>
          <Footer/>          
        </Router>
  )
}

export default App
