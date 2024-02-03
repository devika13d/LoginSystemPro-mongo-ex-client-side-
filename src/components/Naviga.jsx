import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Naviga() {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" style={{position:'fixed',width:'100%'}}>
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Account" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/registration">Create Account</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/login">
                                    Log in
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}

export default Naviga