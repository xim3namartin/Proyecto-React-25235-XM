import React, { useMemo } from "react";
import useBooks from "../components/UseBooks";
import { Card, Row, Col, Spinner } from "react-bootstrap";

function Novedades() {
  // usamos el hook sin modo aleatorio
  const { books, loading } = useBooks("new", false);

  // Filtrar los libros de los últimos 25 años y limitar a 12 (por estética)
  const filteredBooks = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const twentfiveyYearsAgo = currentYear - 25;

    return books
      .filter(
        (book) =>
          book.first_publish_year &&
          book.first_publish_year >= twentfiveyYearsAgo
      )
      .slice(0, 12); // puedes cambiarlo a 10 si prefieres exactamente 10
  }, [books]);

  return (
    <section style={{ padding: "20px" }}>
      <h2 className="mb-4">🆕 Novedades</h2>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p>Cargando novedades...</p>
        </div>
      ) : filteredBooks.length === 0 ? (
        <p className="text-muted">
          No se encontraron libros recientes 😢
        </p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {filteredBooks.map((book, index) => (
            <Col key={index}>
              <Card className="h-100 shadow-sm">
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
                  <small className="text-muted">
                    {book.first_publish_year || "Año desconocido"}
                  </small>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </section>
  );
}

export default Novedades;


