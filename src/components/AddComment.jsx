import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const AddComment = ({ bookId, setComments }) => {
  const [comment, setComment] = useState(""); // Stato per il commento
  const [rate, setRate] = useState(1); // Stato per la valutazione (da 1 a 5)

  // Funzione per inviare il commento
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene il comportamento predefinito del form

    // Crea un nuovo oggetto commento
    const newComment = {
      comment, // Il testo della recensione
      rate,    // La valutazione (da 1 a 5)
      elementId: bookId, // Associa il commento al libro specifico
    };

    try {
      // Esegui la chiamata POST per inviare il commento
      const response = await fetch("https://striveschool-api.herokuapp.com/api/comments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer TUO_TOKEN_API", // Sostituisci con il tuo token API
        },
        body: JSON.stringify(newComment), // Invia il commento come JSON
      });

      if (response.ok) {
        alert("Recensione aggiunta!"); // Mostra un messaggio di successo
        setComment(""); // Pulisce il campo del commento
        setRate(1); // Ripristina la valutazione a 1

        // Dopo aver aggiunto il commento, recupera e aggiorna la lista dei commenti
        const updatedComments = await fetch(`https://striveschool-api.herokuapp.com/api/books/${bookId}/comments`, {
          headers: {
            Authorization: "Bearer TUO_TOKEN_API", // Sostituisci con il tuo token API
          },
        }).then((res) => res.json());

        setComments(updatedComments); // Aggiorna lo stato con i nuovi commenti
      } else {
        alert("Errore nell'invio della recensione.");
      }
    } catch (error) {
      console.error("Errore:", error); // Stampa l'errore in console
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <Form.Group className="mb-2">
        <Form.Label>Scrivi un commento</Form.Label>
        <Form.Control
          type="text"
          placeholder="Inserisci la tua recensione"
          value={comment}
          onChange={(e) => setComment(e.target.value)} // Aggiorna lo stato del commento
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Valutazione</Form.Label>
        <Form.Select value={rate} onChange={(e) => setRate(parseInt(e.target.value, 10))}>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        Invia Recensione
      </Button>
    </Form>
  );
};

export default AddComment;

