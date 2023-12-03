import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
 


function Footer() {
    
  return (
    <Navbar expand="lg"  variant="dark" data-bs-theme="dark" className="bg-body-tertiary ">
    <Container>
      <Navbar.Brand href="#home">Envidi</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {/* <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Product</Nav.Link> */}
        
        </Nav>
        <Navbar.Text>
               Build by Envidi
          </Navbar.Text>
      </Navbar.Collapse>
      
    </Container>
  </Navbar>
  )
}

export default Footer