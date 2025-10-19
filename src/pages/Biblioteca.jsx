// Productos.jsx decido usar el hook useBooks para buscar y mostrar libros 
// src/pages/Biblioteca.jsx
import React from "react";
import useBooks from "../components/UseBooks";
import { Card, Row, Col, Form } from "react-bootstrap";

function Biblioteca() {
  const { books, query, setQuery } = useBooks("");

  return (
    <section style={{ padding: "20px" }}>
      <h2 className="mb-4">📚 Biblioteca</h2>

      {/* Buscador */}
      <Form.Group className="mb-4" style={{ maxWidth: "400px" }}>
        <Form.Control
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="¿Qué libro deseas buscar?"
        />
      </Form.Group>

      {/* Grid de Cards */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {books.length === 0 && query.trim() === "" ? (
          <p className="text-muted">Empieza a escribir para ver resultados 📖</p>
        ) : (
          books.map((book, index) => (
            <Col key={index}>
              <Card className="h-100 shadow-sm">
                {/* Imagen */}
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

                {/* Info */}
                <Card.Body>
                  <Card.Title style={{ fontSize: "16px" }}>
                    {book.title}
                  </Card.Title>
                  {book.author_name && (
                    <Card.Text className="text-muted" style={{ fontSize: "14px" }}>
                      {book.author_name.join(", ")}
                    </Card.Text>
                  )}
                </Card.Body>

                <Card.Footer className="text-center">
                  <small className="text-muted">ID: {book.key}</small>
                </Card.Footer>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </section>
  );
}

export default Biblioteca;

