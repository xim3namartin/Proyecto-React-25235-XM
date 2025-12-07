import { useState, useEffect } from 'react'
import useBooks from './components/UseBooks';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from './components/Login';
import { CartProvider } from './components/CartContext';
import Carrito from './components/Carrito'; 
import CrudProductos from './components/CrudProductos';


import Home from "./pages/Home";
import BestSeller from "./pages/BestSeller";
import Novedades from "./pages/Novedades";

function App() {

    useEffect(() => {
    document.body.style.backgroundColor = "#fff6ed"; // fondo crema suave
    document.body.style.color = "#333"; // texto oscuro
    document.body.style.fontFamily = "'Segoe UI', 'Roboto', sans-serif";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.transition = "background-color 0.4s ease";
  }, []);

  return (

      <CartProvider>
        <Router>
          <Header/>
                <Container>
                  <Routes>
                    <Route path="/" element={<Home/>} />
                     <Route path="/administracion" element={<Login />} />
                     
                    <Route path="/BestSeller" element={<BestSeller/>} />

                    <Route path="/Novedades" element={<Novedades/>} />
                    
                     <Route path="/carrito" element={<Carrito />} />

                    <Route path="/crud" element={<CrudProductos />} />

                  </Routes>
                </Container>
          <Footer/>          
        </Router>
        </CartProvider>
  )
}

export default App
