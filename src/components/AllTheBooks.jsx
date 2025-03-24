import { useState } from "react";
import { Col, Row, Container, Form } from "react-bootstrap";
import books from "../data/fantasy.json";
import SingleBook from "./SingleBook"; 

const AllTheBooks = () => {
  const [searchTerm, setSearchTerm] = useState(""); 


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

 
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="my-4">
      {}
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Cerca un libro..."
          value={searchTerm}
          onChange={handleSearch} ></Form.Control>
      </Form.Group>

      {}
      <Row>
  {books.map((book) => (
    <Col key={book.asin} xs={6} md={4} lg={3}>
      <SingleBook book={book} />
    </Col>
  ))}
</Row>

    </Container>
  );
};

export default AllTheBooks;
