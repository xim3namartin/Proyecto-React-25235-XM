import React, { useContext } from "react";
import useBooks from "../components/UseBooks";
import { Card, Row, Col, Spinner, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import { CartContext } from "../components/CartContext"; // importa tu contexto


function Home() {
  const { books, query, setQuery, loading } = useBooks("", true); // true = modo aleatorio
  const { agregarAlCarrito } = useContext(CartContext); // usa el contexto
  
  const getPrecioAleatorio = () => {
    return Math.floor(Math.random() * 41) + 10;  // Precio entre 10 y 50 euros
  };

  return (
    <section 
  style={{ 
    padding: "20px", 
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center", 
    justifyContent: "center" 
  }}
>
  <h2 className="mb-4 text-center">📚 Bienvenidos</h2>

  {/* 🔍 Buscador */}
  <Form.Group className="mb-4" style={{ maxWidth: "400px", width: "100%" }}>
    <Form.Control
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="¿Qué libro deseas buscar?"
            style={{
              borderRadius: "25px",
              padding: "12px 20px",
              border: "1px solid #ccc",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              fontSize: "16px",
              transition: "all 0.3s ease",
              outline: "none",
              textAlign: "center"
            }}
            onFocus={(e) => e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)"}
            onBlur={(e) => e.target.style.boxShadow = "0 2px 6px rgba(0,0,0,0.08)"}
    />
  </Form.Group>

      {/* 📖 Lista de libros */}
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p>Cargando libros...</p>
        </div>
      ) : books.length === 0 ? (
        <p className="text-muted">
          No se encontraron resultados para tu búsqueda 😢
        </p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {books.map((book, index) => (
            <Col key={index}>
              <Card className="h-100 shadow-sm"
               style={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                overflow: "hidden",
                borderColor: "#aea5a5ff"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.06)";
              }}
        >
                {book.cover_i ? (
                  <Card.Img
                    variant="top"
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                    alt={book.title}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      height: "250px",
                      background: "#eee",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontStyle: "italic",
                    }}
                  >
                    Sin portada
                  </div>
                )}

                <Card.Body>
                 <div>
            <Card.Title style={{ fontSize: "16px", fontWeight: 600 }}>
              {book.title}
            </Card.Title>
            {book.author_name && (
              <Card.Text style={{ fontSize: "14px", color: "#555" }}>
                {book.author_name.join(", ")}
              </Card.Text>
            )}
          </div>

         
                </Card.Body>

               <Card.Footer
                  style={{
                    backgroundColor: "transparent",
                    color: "#585555ff",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  <small>
                    Año: {book.first_publish_year || "desconocido"}
                  </small>
              </Card.Footer>

            {/* 🔹 Botón Agregar al carrito */}
        <button
          onClick={() => {
            agregarAlCarrito({
              id: book.key, // usa un identificador único
              title: book.title,
              author: book.author_name ? book.author_name.join(", ") : "Desconocido",
              year: book.first_publish_year || "desconocido",
              price: getPrecioAleatorio(),
            }); 

            Swal.fire({
              title: "¡Producto agregado!",
              text: "El libro se añadió correctamente al carrito.",
              icon: "success",
              confirmButtonText: "Ok",
              confirmButtonColor: "#b85c5c",
            });
          }}
          style={{
            marginTop: "10px",
            padding: "8px 14px",
            backgroundColor: "#f8ca9fff",
            color: "#1f1d1dff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            transition: "background-color 0.3s ease, transform 0.2s ease",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = "#b85c5c";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = "#f8ca9fff";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <FontAwesomeIcon icon={faShoppingCart} size="lg" />
        </button>

              </Card>
            </Col>
          ))}
        </Row>
      )}
    </section>
  );
}

export default Home;
