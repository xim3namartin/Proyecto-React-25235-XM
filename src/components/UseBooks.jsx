import { useState, useEffect } from "react";
function useBooks(initialQuery = "", random = false) {
  const [query, setQuery] = useState(initialQuery);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    // Si estamos en modo aleatorio y no hay búsqueda del usuario:
    const randomTopics = [
      "love",
      "science",
      "fantasy",
      "history",
      "art",
      "adventure",
      "magic",
      "war",
      "space",
      "life",
    ];
    let searchTerm = "";
    if (query.trim() !== "") {
      // el usuario está buscando
      searchTerm = query.trim();
    } else if (random) {
      // modo aleatorio sin búsqueda
      const randomWord =
        randomTopics[Math.floor(Math.random() * randomTopics.length)];
      searchTerm = randomWord;
    } else {
      setBooks([]);
      setLoading(false);
      return;
    }
    fetch(`https://openlibrary.org/search.json?title=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        const shuffled = data.docs.sort(() => 0.5 - Math.random()).slice(0, 10);
        setBooks(shuffled);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [query, random]);
  return { books, query, setQuery, loading };
}
export default useBooks;




