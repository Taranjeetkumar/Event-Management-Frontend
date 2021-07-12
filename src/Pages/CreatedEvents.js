import Header from '../Components/Header';
import Footer from '../Components/Footer';
import EventsCreated from '../Sections/EventsCreated';
const CreatedEvents = () => {
    return (
        <>
            <Header />
            <div className='container-fluid' style={{ paddingTop: '130px' }}>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <h1>Created Events</h1>
                    </div>
                    <div className='row justify-content-center'>
                        <EventsCreated hideTittle={true} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default CreatedEvents;