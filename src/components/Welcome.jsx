import { Alert } from 'react-bootstrap';

const Welcome = () => {
  return (
    <div className="text-center my-4">
      <h1>Welcome to EpiBooks</h1>
      <Alert variant="info">Explore our collection of books!</Alert>
    </div>
  );
};

export default Welcome;
