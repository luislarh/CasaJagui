import React, { useContext  } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import logo from "../../img/logoCasa.svg";
import "./navbar.css"; // Conserva tus estilos personalizados si los necesitas
import { AuthContext } from '../../context/AuthContext';

const NavInicio = () => {
    
    const { user } = useContext(AuthContext);

    return (

    <>
    {/* <Navbar bg="custom" style={{ backgroundColor: 'rgb(253, 252, 224)', zIndex: 1000 }} variant="light" expand="lg">
    <Container>
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        CASA JAGUI
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/MenuInicio">Menú</Nav.Link>
                            <Nav.Link href="/Restaurantes">Restaurantes</Nav.Link>
                            <Nav.Link href="/Oficinas">Oficinas</Nav.Link>
                            <Nav.Link href="/reserva">Reserva</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar> */}
        {['lg'].map((expand) => (
            <Navbar key={expand} expand={expand} bg="custom" style={{ backgroundColor: 'rgb(253, 252, 224)'}} className="mb-3">
            <Container fluid>
            <Navbar.Brand href="/">
                        <img
                            alt=""
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        CASA JAGUI
                </Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
                >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    CASA JAGUI
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body style={{ backgroundColor: 'rgb(253, 252, 224)' }}>
                    <Nav className="justify-content flex-grow-1 pe-3">
                            <Nav.Link href="/MenuInicio">Menú</Nav.Link>
                            <Nav.Link href="/Restaurantes">Restaurantes</Nav.Link>
                            <Nav.Link href="/Oficinas">Oficinas</Nav.Link>
                            <Nav.Link href="/reserva">Reserva</Nav.Link>
                    </Nav>
                    <Nav>
                    {user ? (
                            <>
                                <Nav.Link>{user.email}</Nav.Link>
                                <Nav.Link href="/logout">Salir</Nav.Link>
                            </>
                        ) : (
                            <Nav.Link href="/login">Login</Nav.Link>
                        )}
                    </Nav>
                </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
            </Navbar>
            ))}
        </>
    );
}

export default NavInicio;
