import React, { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { getCookies, setCookies } from '../Services/Cookies';
import { authDetails } from '../MiddleWaer/authDetails';
import { useHistory } from "react-router-dom";
const Header = () => {
    const history  = useHistory();
    const [token, setToken] = useState('');
    const [userDetails, setUserDetails] = useState(false);
    useEffect(async () => {
        await setToken(getCookies('USER_TOKEN'))
        await authDetails().then(response => {
            setUserDetails(response)
        })
        return () => {
        }
    }, [])
    return (
        <header className='header_container'> 
            <Navbar fixed="top" collapseOnSelect expand="lg" bg="#fff" variant="light" style={{ background: '#fff', color: '#fff',borderBottom:'solid #004d64 2px'}}>
                <Navbar.Brand href="/" className='brandLogo'>Managex</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nreact-bootstrapav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav>
                        <Nav.Link eventKey={2} href="/events" className='card-btn'>
                            Events
                        </Nav.Link>
                        {
                            !token ?
                                <Nav.Link href="/login" className='sign-up'>Login</Nav.Link>
                                : <div className="nav-item dropdown webViewIcon">
                                    <a data-toggle="dropdown" id='gphs11' className="userIcons">{userDetails?.name?.charAt(0)?userDetails?.name?.charAt(0):'U'}</a>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item submenu_list" id='gphs15' onClick={() => {history.push('/create-events')}}>Create Events</a>
                                        <a className="dropdown-item submenu_list" id='gphs15' onClick={() => {history.push('/created-events')}}>Created Events</a>
                                        <a className="dropdown-item submenu_list" id='gphs15' onClick={() => {history.push('/user-booking')}}>Booking</a>
                                        <a className="dropdown-item submenu_list" id='gphs14' onClick={() => {setCookies('USER_TOKEN','');history.push('/login')}}>Logout</a>
                                    </div>
                                </div>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
}
export default Header;
