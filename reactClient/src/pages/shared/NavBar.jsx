import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../home/Home.css";

const NavBar = () => {

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
          <Link className="link ms-auto" to={"/login"}>
              Login
            </Link>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
