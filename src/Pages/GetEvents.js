import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Events from '../Sections/Events';
const GetEvents = () => {
    return (
        <>
            <Header />
            <div className='container-fluid' style={{ paddingTop: '130px' }}>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <h1>Upcoming Events</h1>
                    </div>
                    <div className='row justify-content-center'>
                        <Events hideTittle={true} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default GetEvents;