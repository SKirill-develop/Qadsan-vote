import headerStyles from "./Header.module.css";
import Logo from "../../image/logotip.png";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

const Header = () => (
  <header>
    <Navbar expand="lg" variant="light" bg="light">
      <Container>
        <Navbar.Brand href="/">
          <img src={Logo} alt="Logo" className={headerStyles.logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className={headerStyles.menu}>
          <Nav>
            <Link to="/" className={headerStyles.menu_item}>
              <h5>Home</h5>
            </Link>
            <Link to="/wallet" className={headerStyles.menu_item}>
              <h5>Wallet</h5>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
);

export default Header;
