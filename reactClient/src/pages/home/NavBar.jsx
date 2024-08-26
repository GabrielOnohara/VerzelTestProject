import { Navbar, Container, NavDropdown } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

import "./Home.css";

const NavBar = ({ user, logout }) => {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary navbar-fixed"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Brand class-name="mr-auto">
            <Link className="link ms-auto" to={"/home"}>
              Vercel Movies
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Link className="link ms-auto" to={"/favorites"}>
              Meus Favoritos
            </Link>
            <NavDropdown
              className="ms-auto"
              title={user.username ?? ""}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                onClick={() => {
                  logout();
                  goToLogin()
                }}
              >
                Sair
              </NavDropdown.Item>
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
  logout: PropTypes.func.isRequired,
};

export default NavBar;
