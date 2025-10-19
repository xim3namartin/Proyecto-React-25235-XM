import { useState } from 'react'
import useBooks from './components/UseBooks';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";


import Home from "./pages/Home";
import Clientes from "./pages/Clientes";
import Biblioteca from "./pages/Biblioteca";
import Servicios from "./pages/Servicios";
import Contacto from "./pages/Contacto";

function App() {

  return (

        <Router>
          <Header/>
                <Container>
                  <Routes>
                    <Route path="/" element={<Home/>} />
                    
                    <Route path="/clientes" element={<Clientes/>} />

                    <Route path="/Biblioteca" element={<Biblioteca/>} />

                    <Route path="/servicios" element={<Servicios/>} />

                    <Route path="/contacto" element={<Contacto/>} />

                  </Routes>
                </Container>
          <Footer/>          
        </Router>
  )
}

export default App
