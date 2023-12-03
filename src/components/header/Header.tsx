import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavBarLeft from './NavBarLeft';

function Header() {
    const carts = useSelector((state:any)=>state.cart.carts)
  
    
  return (
    <Navbar expand="lg" variant="dark" data-bs-theme="dark" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="#home">Envidi Shop</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link className="text-white text-xl " to="/">Home</Link>
          <Link className="text-white text-xl ms-3" to="/product">Product</Link>
        
        </Nav>
        <Navbar.Text className='d-flex gap-2.5'>
            <NavBarLeft carts={carts}/>
           
          </Navbar.Text>
      </Navbar.Collapse>
      
    </Container>
  </Navbar>
  )
}

export default Header