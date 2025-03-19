import { Navbar, Nav, Container } from 'react-bootstrap';

const MyNav = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">EpiBooks</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#">About</Nav.Link>
          <Nav.Link href="#">Browse</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNav;
