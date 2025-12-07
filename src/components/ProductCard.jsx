import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ product, agregarAlCarrito }) => {
  return (

    // Armo la cards
    <Card className="h-100 d-flex flex-column">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.title}
        className="card-img-top img-fluid" 
        style={{ 
          height: '200px', 
          //objectFit: 'contain', // ajusta sin recortar
          //objectFit: 'cover', 
          objectPosition: 'center', // centra la imagen
        }} 
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>
          {product.description.slice(0, 100)}...
        </Card.Text>
        <Card.Text>
          <strong>${product.price}</strong>
        </Card.Text>
        <Button variant="primary" onClick={() => agregarAlCarrito(product)}>
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;