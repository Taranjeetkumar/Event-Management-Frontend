import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Account from '../Sections/Account';
import { useHistory } from "react-router-dom";
import { getCookies} from '../Services/Cookies';
const Auth = () => {
    const history = useHistory();
    const [token, setToken] = useState('')
    useEffect(() => {
        setToken(getCookies('USER_TOKEN'))
        window.scrollTo(0, 0)
        return () => {
        }
    }, [])
    return (
        <>
            {
                !token ?
                    <>
                        <Header />
                        <Account />
                        <Footer />
                    </>
                :
                history.push('/')
            }
        </>
    )
}
export default Auth;