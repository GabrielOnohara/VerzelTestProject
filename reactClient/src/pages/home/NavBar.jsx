import {  Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import PropTypes from "prop-types";
import './Home.css'

const NavBar = ({ user }) => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary navbar-fixed" data-bs-theme="dark">
        <Container>
          <Navbar.Brand class-name="mr-auto" href="#home">
            Vercel Movies
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav.Link className="ms-auto" href="#link">
              Meus favoritos
            </Nav.Link>
            <NavDropdown
              className="ms-auto"
              title={user.username ?? ""}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">Sair</NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

NavBar.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default NavBar;
