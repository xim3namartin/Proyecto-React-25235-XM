import React, { useMemo, useContext } from "react";
import useBooks from "../components/UseBooks";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import { CartContext } from "../components/CartContext"; // importa tu contexto

function Novedades() {
  const { books, loading } = useBooks("new", false);
  const { agregarAlCarrito } = useContext(CartContext);

  const filteredBooks = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const twentyYearsAgo = currentYear - 20;

    return books
      .filter(
        (book) =>
          book.first_publish_year &&
          book.first_publish_year >= twentyYearsAgo
      )
      .slice(0, 12);
  }, [books]);

  const frases = [
    "Un viaje inesperado...",
    "Historias que inspiran ✨",
    "Lectura para reflexionar",
    "Un clásico moderno",
    "Perfecto para tardes tranquilas ☕",
    "Te atrapará desde la primera página",
    "Ideal para curiosos y soñadores",
    "Un mundo por descubrir 🌍",
  ];

  const getRandomFrase = () =>
    frases[Math.floor(Math.random() * frases.length)];

  const getPrecioAleatorio = () => {
    return Math.floor(Math.random() * 41) + 10; // Precio entre 10 y 50 euros
  };

  return (
    <section
      style={{
        padding: "40px",
        backgroundColor: "#fdf6f0",
        borderRadius: "12px",
      }}
    >
      <h2
        className="mb-4 text-center"
        style={{
          fontWeight: "600",
          color: "#241c19ff",
        }}
      >
        📚 Novedades
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
        Descubre los libros más recientes y emocionantes de la última década.
      </p>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p>Cargando novedades...</p>
        </div>
      ) : filteredBooks.length === 0 ? (
        <p className="text-muted">No se encontraron libros recientes 😢</p>
      ) : (
        <>
          {/* ⭐ LIBRO DESTACADO */}
          <Row className="mb-4">
            <Col xs={12}>
              <Card
                className="shadow-sm"
                style={{
                  position: "relative",
                  borderRadius: "14px",
                  overflow: "hidden",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  borderBottom: "8px solid #d4a373",
                  backgroundColor: "#fffaf4",
                }}
              >
                {filteredBooks[0].cover_i && (
                  <div style={{ height: "420px" }}>
                    <Card.Img
                      src={`https://covers.openlibrary.org/b/id/${filteredBooks[0].cover_i}-L.jpg`}
                      alt={filteredBooks[0].title}
                      style={{
                        height: "100%",
                        objectFit: "cover",
                        filter: "contrast(1.15) saturate(1.3)",
                      }}
                    />
                  </div>
                )}

                <Card.Body>
                  <h4
                    style={{
                      fontWeight: 600,
                      fontFamily: "Playfair Display, serif",
                    }}
                  >
                    {filteredBooks[0].title}
                  </h4>
                  {filteredBooks[0].author_name && (
                    <p
                      style={{
                        color: "#555",
                        fontFamily: "Playfair Display, serif",
                      }}
                    >
                      {filteredBooks[0].author_name.join(", ")}
                    </p>
                  )}
                  <p
                    style={{
                      fontStyle: "italic",
                      fontSize: "16px",
                      color: "#261d1cff",
                      fontFamily: "Playfair Display, serif",
                      marginBottom: "12px",
                    }}
                  >
                    {getRandomFrase()}
                  </p>
                  
                </Card.Body>

                <Card.Footer className="text-center text-muted">
                  Año: {filteredBooks[0].first_publish_year}
                </Card.Footer>

                 {/* Botón Agregar al carrito */}
                  <div className="text-center">
                    <button
                      onClick={() => {
                        agregarAlCarrito({
                          id: filteredBooks[0].key,
                          title: filteredBooks[0].title,
                          author: filteredBooks[0].author_name
                            ? filteredBooks[0].author_name.join(", ")
                            : "Desconocido",
                          year: filteredBooks[0].first_publish_year || "desconocido",
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
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      padding: "6px 10px",
                      backgroundColor: "#f8ca9fff",
                      color: "#1f1d1dff",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "500",
                      zIndex: 2,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                      transition: "background-color 0.3s ease, transform 0.2s ease",
                                        }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#b85c5c";
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#f8ca9fff";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                    </button>
                  </div>
              </Card>
            </Col>
          </Row>

          {/* 📚 RESTO DE NOVEDADES */}
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {filteredBooks.slice(1).map((book, index) => (
              <Col key={index}>
                <Card
                  className="h-100"
                  style={{
                    borderRadius: "12px",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                    borderBottom: "6px solid #d4a373",
                    backgroundColor: "#fffaf4",
                    transition: "transform 0.2s ease",
                    fontFamily: "Playfair Display, serif",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-4px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  {book.cover_i && (
                    <div style={{ height: "260px", overflow: "hidden" }}>
                      <Card.Img
                        src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                        alt={book.title}
                        style={{
                          height: "100%",
                          objectFit: "cover",
                          filter: "contrast(1.1) saturate(1.2)",
                        }}
                      />
                    </div>
                  )}

                  <Card.Body>
                    <Card.Title
                      style={{
                        fontSize: "15px",
                        fontFamily: "Playfair Display, serif",
                        color: "#2e2a27ff",
                      }}
                    >
                      {book.title}
                    </Card.Title>
                    {book.author_name && (
                      <Card.Text
                        style={{
                          fontSize: "14px",
                          color: "#666",
                         fontFamily: "Playfair Display, serif",
                        }}
                      >
                        {book.author_name.join(", ")}
                      </Card.Text>
                    )}
                    <p
                      style={{
                        fontStyle: "italic",
                        fontSize: "18px",
                        color: "#090807ff",
                       fontFamily: "Playfair Display, serif",
                        marginBottom: "12px",
                      }}
                    >
                      {getRandomFrase()}
                    </p>
                    {/* Botón Agregar al carrito */}
                    <div className="text-center">
                      <button
                        onClick={() => {
                          agregarAlCarrito({
                            id: book.key,
                            title: book.title,
                            author: book.author_name
                              ? book.author_name.join(", ")
                              : "Desconocido",
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
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#b85c5c";
                          e.currentTarget.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#f8ca9fff";
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      >
                        <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                      </button>
                    </div>
                  </Card.Body>

                  <Card.Footer className="text-center text-muted">
                    {book.first_publish_year}
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </section>
  );
}

export default Novedades;





