import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { getCookies, setCookies} from '../Services/Cookies';
import { getMethod, postMethod} from '../Services/APIServices';
import {authDetails} from '../MiddleWaer/authDetails';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const EventsCreated = (props) => {
    const history = useHistory();
    const [token, setToken] = useState('');
    const [eventsData, setEventsData] = useState([]);
    const [bookedStatus, setBookedStatus] = useState([]);
    const [userActive,setUserActive] = useState('');
    const dateFormatConverter = (arg) => {
        let date = new Date(arg);
        let datel = date.getUTCDate();
        let monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let returnDate = datel + ' ' + monthArray[(date.getUTCMonth())] + ' ' + date.getUTCFullYear()
        return returnDate;
    }
    const  handleBooked=async(value)=>{
        let bookedData = {eventId:value};
        postMethod('/api/v1/booking/add',bookedData).then(response=>{
            if(response.success)
            {
                toast.success('Event Successfully Booked!', {
                    position: "bottom-right",
                    onClose:()=>{setBookedStatus([...bookedStatus,{eventId:value,status:true}])},
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }else{
                toast.error(response.error, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
              console.log(response)
        })
    }
    useEffect(async() => {
        await setToken(getCookies('USER_TOKEN'))
        await getMethod('/api/v1/post/all?page=1&limit=10').then(response => {
            if(response.success) {
                setEventsData(response.data);
            }
        })
        await authDetails().then(response=>{
            //setUserActive
            setUserActive(response?._id)
        })
        window.scrollTo(0, 0)
        return () => {
        }
    }, [])
    return (
        <div className='container-fluid'>
            <div className='container' style={{ marginTop: '25px', marginBottom: '25px' }}>
                <div className='row justify-content-center' style={{ display: props?.hideTittle ? 'none' : 'block' }}>
                    <h1>Latest Events</h1>
                </div>
                <div className='row justify-content-left' style={{ marginTop: '25px' }}>
                    {
                        eventsData.length ?
                            eventsData?.map((item, index) =>
                                userActive === item?.organizerId?._id?
                                <div className='col-md-4 col-12' key={index} style={{marginTop:'25px',marginBottom:'25px'}}>
                                    <Card style={{ width: '100%' }}>
                                        <Card.Img variant="top" src={item?.eventImages[0]} />
                                        <Card.Body className='cardBody'>
                                            <Card.Title>{item?.eventName}&nbsp;{item?.eventPrice?'(Rs '+item?.eventPrice+')':'(Free)'}</Card.Title>
                                            <Card.Title className='colLittle'>{dateFormatConverter(item?.eventStartDate) +' - '+dateFormatConverter(item?.eventEndDate)}</Card.Title>
                                            <Card.Title className='colLittle'>{item?.location}</Card.Title>
                                            <Card.Text>
                                                {
                                                    item?.eventDescription
                                                }
                                            </Card.Text>
                                                {/* <Button className='formbutton2' onClick={()=>history.push('/edit-event?events='+item._id,{edit:true})}>Edit Created Event</Button> */}
                                        </Card.Body>
                                    </Card>
                                </div>
                                :null
                            )
                            : null
                    }
                </div>
            </div>
        </div>
    )
}
export default EventsCreated;
//userActive