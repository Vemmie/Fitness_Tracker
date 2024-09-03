import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Navbar } from 'react-bootstrap';


function App() {
  const [count, setCount] = useState(0);

  return (
    <Container>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Fitness Tracker</Navbar.Brand>
      </Navbar>
      <div className="mt-4">
        <Button variant="primary" onClick={() => setCount(count + 1)}>
          Click me! Count is {count}
        </Button>
      </div>
    </Container>
  );
}

export default App;