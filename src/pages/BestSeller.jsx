import React, { useMemo } from "react";
import useBooks from "../components/UseBooks";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function BestSeller() {
  // usamos el hook sin modo aleatorio ni búsqueda
  const { books, loading } = useBooks("popular", false);

  // Filtrar los libros publicados en los últimos 30 años y limitar a 15
  const filteredBooks = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const thirtyYearsAgo = currentYear - 30;

    return books
      .filter(
        (book) =>
          book.first_publish_year &&
          book.first_publish_year >= thirtyYearsAgo
      )
      .slice(0, 15); // se muestran 15 libros
  }, [books]);

  return (
    <section style={{ padding: "20px",  }}>
            <h2
        className="mb-4 text-center"
        style={{
          fontWeight: "600",
          color: "#241c19ff",
        }}
      >
        📚 Bestseller
      </h2>
      <p
        style={{
          fontStyle: "italic",
          color: "#181312ff",
          marginBottom: "30px",
          fontSize: "22px",
          textAlign: "center",
          fontFamily: "Playfair Display, serif",
        }}
      >
        Descubre los libros más vendidos de la última década.
      </p>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p>Cargando best sellers…</p>
        </div>
      ) : filteredBooks.length === 0 ? (
        <p className="text-muted">No se encontraron libros populares recientes 😢</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {filteredBooks.map((book, index) => (
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
                {/* Portada */}
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
                  <Card.Title style={{ fontSize: "16px" }}>{book.title}</Card.Title>
                  {book.author_name && (
                    <Card.Text className="text-muted" style={{ fontSize: "14px" }}>
                      {book.author_name.join(", ")}
                    </Card.Text>
                  )}
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
                            onClick={() => alert("Se agregó al carrito")}
                            style={{
                              marginTop: "10px",
                              padding: "8px 14px",
                              backgroundColor: "#f8ca9fff", // tono terracota
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

export default BestSeller;
