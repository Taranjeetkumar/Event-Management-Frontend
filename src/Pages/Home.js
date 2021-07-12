import React from 'react';
import Header from '../Components/Header';
import HomeBanner from '../Sections/HomeBanner';
import Footer from '../Components/Footer';
import Events from '../Sections/Events';
const Home=()=>{
    return(
        <>
        <Header/>
        <HomeBanner/>
        <Events/>
        <Footer/>
        </>
    )
}
export default Home;