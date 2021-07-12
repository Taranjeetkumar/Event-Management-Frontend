import Header from '../Components/Header';
import Footer from '../Components/Footer';
import UserBooking from '../Sections/UserBooking';
const UserBook = () => {
    return (
        <>
            <Header />
            <div className='container-fluid' style={{ paddingTop: '130px' }}>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <h1>User Booking Events</h1>
                    </div>
                    <div className='row justify-content-center'>
                        <UserBooking hideTittle={true} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default UserBook;