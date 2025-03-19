import { useState } from "react";
import { Card } from "react-bootstrap";

const SingleBook = ({ book }) => {
  const [selected, setSelected] = useState(false); 
  const toggleSelection = () => {
    setSelected(!selected);
  };

  return (
    <Card
      className={`h-100 shadow-sm ${selected ? "border border-danger border-3" : ""}`}
      onClick={toggleSelection}
      style={{ cursor: "pointer" }}
    >
      <Card.Img variant="top" src={book.img} alt={book.title} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text className="text-muted">${book.price.toFixed(2)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SingleBook;
