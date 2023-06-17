import { useState } from "react";
import { Container, Form, Nav, Navbar, Button, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";
import { readToken, removeToken } from "@/lib/authenticate";

const MainNav = () => {
  const router = useRouter();
  const [searchField, setSearchField] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  function logout()
  {
    setIsExpanded(false);
    removeToken();
    router.push("/login")
  }

  let token = readToken();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsExpanded(false);
    const queryString = `title=true&q=${searchField}`;
    router.push(`/artwork?${queryString}`);
    setSearchHistory(await addToHistory(`title=true&q=${searchField}`)) 
  };

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNavClick = () => {
    setIsExpanded(false);
  };

  const handleFavouritesClick = () => {
    setIsExpanded(false);
  };

  return (
    <>
      <Navbar className="fixed-top navbar-dark bg-dark " expand="md" expanded={isExpanded}>
        <Container>
          <Navbar.Brand>Kayden Nguyen</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" onClick={handleNavClick}>
              <Nav.Link as="a" href="/" className="nav-link" activeClassName="active-link" active={router.pathname === '/'} passHref legacyBehavior>
                Home
              </Nav.Link>
              {token && (<Nav.Link as="a" href="/search" className="nav-link" activeClassName="active-link" active={router.pathname === '/search'} passHref legacyBehavior>
                Advance Search
              </Nav.Link>)}
            </Nav>
            &nbsp;
            {token && (<Form className="d-flex" onSubmit={handleSubmit}>
              <Form.Control
                type="text"
                placeholder="Search"
                className="me-2"
                value={searchField}
                onChange={handleChange}
              />
              <Button variant="success" type="submit">Search</Button>
            </Form>)}
            &nbsp;
            {token ? (<Nav>
              <NavDropdown title={token.userName} id="basic-nav-dropdown" onClick={handleFavouritesClick}>
                <Link href="/favourites" className="nav-link" passHref legacyBehavior>
                  <NavDropdown.Item active={router.pathname === '/favourites'}>My Favourite Artworks</NavDropdown.Item>
                </Link>
                <Link href="/history" className="nav-link" passHref legacyBehavior>
                  <NavDropdown.Item active={router.pathname === '/history'}>Search History</NavDropdown.Item>
                </Link>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>) : (
              <Nav className="ml-auto">
                <Button variant="outline-light" className="mx-1" href="/login">Login</Button>
                <Button variant="outline-light" className="mx-2" href="/register">Register</Button>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br /><br />
    </>
  )
};

export default MainNav;
