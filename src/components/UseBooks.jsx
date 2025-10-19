// Este hook solo trae los libros y devuelve el estado

import { useState, useEffect } from "react";

function useBooks(initialQuery = "") {
  const [query, setQuery] = useState(initialQuery);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (!query.trim()) {
      setBooks([]); // limpiar si no hay búsqueda
      return;
    }

    fetch(`https://openlibrary.org/search.json?title=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.docs.slice(0, 12)); // tomar primeros 12 resultados
      })
      .catch((err) => console.error(err));
  }, [query]);

  return { books, query, setQuery };
}

export default useBooks;




