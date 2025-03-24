import { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import SingleComment from "./SingleComment"; // Importiamo SingleComment

const CommentArea = ({ bookId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/books/${bookId}/comments`);
        if (response.ok) {
          const data = await response.json();
          setComments(data); // Imposta i commenti
        } else {
          console.error("Errore nel recupero dei commenti");
        }
      } catch (error) {
        console.error("Errore:", error);
      } finally {
        setLoading(false); // Termina il caricamento
      }
    };

    fetchComments();
  }, [bookId]); // Quando cambia il bookId, fetchiamo i nuovi commenti

  return (
    <div>
      {loading && <p>Caricamento commenti...</p>}
      {!loading && comments.length === 0 && <p>Non ci sono commenti per questo libro.</p>}
      {!loading && comments.length > 0 && (
        <ListGroup>
          {comments.map((comment) => (
            <SingleComment key={comment._id} comment={comment} /> // Visualizza i commenti esistenti
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default CommentArea;
