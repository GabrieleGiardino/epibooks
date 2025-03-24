import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import AddComment from "./AddComment"; // Importiamo AddComment

const SingleBook = ({ book }) => {
  const [selected, setSelected] = useState(false); // Stato per selezionare o meno un libro
  const [comment, setComment] = useState(""); // Stato per il commento
  const [rating, setRating] = useState(1); // Stato per la valutazione
  const [comments, setComments] = useState([]); // Stato per i commenti esistenti

  // Funzione per alternare la selezione del libro
  const toggleSelection = () => {
    setSelected(!selected); // Modifica lo stato di selezione
  };

  return (
    <Card
      className={`h-100 shadow-sm ${selected ? "border border-danger border-3" : ""}`}
      onClick={toggleSelection} // Cambia lo stato quando clicchi sulla card
      style={{ cursor: "pointer" }}
    >
      <Card.Img variant="top" src={book.img} alt={book.title} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text className="text-muted">${book.price.toFixed(2)}</Card.Text>
      </Card.Body>

      {/* Mostriamo il form per il commento e la valutazione solo se il libro è selezionato */}
      {selected && (
        <>
          <div className="mt-3">
            <h5>Scrivi una recensione:</h5>
            <Form>
              {/* Campo per inserire il commento */}
              <Form.Group className="mb-3">
                <Form.Label>Commento</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Inserisci il tuo commento..."
                />
              </Form.Group>

              {/* Seleziona la valutazione da 1 a 5 */}
              <Form.Group className="mb-3">
                <Form.Label>Valutazione</Form.Label>
                <Form.Select
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value, 10))}
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* Pulsante per inviare la recensione */}
              <Button
                variant="primary"
                onClick={async (e) => {
                  e.preventDefault(); // Impedisce il comportamento di submit di default
                  // Aggiungi la recensione usando una chiamata API
                  try {
                    const newComment = {
                      comment,
                      rate: rating,
                      elementId: book.asin,
                    };
                    const response = await fetch(
                      "https://striveschool-api.herokuapp.com/api/comments/",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: "Bearer TUO_TOKEN_API", // Sostituisci con il tuo token
                        },
                        body: JSON.stringify(newComment),
                      }
                    );

                    if (response.ok) {
                      alert("Recensione inviata!");
                      setComment(""); // Reset commento
                      setRating(1); // Reset valutazione
                      // Ricarica i commenti
                      const updatedComments = await fetch(
                        `https://striveschool-api.herokuapp.com/api/books/${book.asin}/comments`,
                        {
                          headers: {
                            Authorization: "Bearer TUO_TOKEN_API", // Sostituisci con il tuo token
                          },
                        }
                      ).then((res) => res.json());
                      setComments(updatedComments); // Aggiorna i commenti
                    } else {
                      alert("Errore nell'invio della recensione.");
                    }
                  } catch (error) {
                    console.error("Errore:", error);
                  }
                }}
              >
                Invia Recensione
              </Button>
            </Form>
          </div>
        </>
      )}
    </Card>
  );
};

export default SingleBook;
