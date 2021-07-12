import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { getCookies, setCookies} from '../Services/Cookies';
import { getMethod, postMethod} from '../Services/APIServices';
import {authDetails} from '../MiddleWaer/authDetails';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Events = (props) => {
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
        // var rzp1 = new window.Razorpay(options);
        // rzp1.open();
        let bookedData = {eventId:value};
        postMethod('/api/v1/booking/add',bookedData).then(response=>{
            if(response.success)
            {
                const bookingId = {bookingId:response.data._id};
                postMethod('/api/v1/payment/generateId',bookingId).then(response2=>{
                    if(response2.success)
                    {
                        const orderId = response2.booking._id;
                        const options = {
                            key: 'rzp_test_d3fIdfEXIFhpGY',
                            amount: response2.booking.eventId.eventPrice, //  = INR 1
                            name: 'Razorpay',
                            description: 'Razorpay',
                            image: 'https://previews.123rf.com/images/subhanbaghirov/subhanbaghirov1605/subhanbaghirov160500087/56875269-vector-light-bulb-icon-with-concept-of-idea-brainstorming-idea-illustration-.jpg',
                            handler: function(response3) {
                                const orderConfirmed = {bookingId: orderId,paymentId:response3.razorpay_payment_id,status:'paid'}
                                postMethod('/api/v1/payment/create',orderConfirmed).then(response4=>{
                                    if(response4.success)
                                    {
                                        toast.success('Successfully Event Booked!', {
                                            position: "bottom-right",
                                            autoClose: 5000,
                                            hideProgressBar: true,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                        })
                                    }else{
                                        toast.error('Failed booking!', {
                                            position: "bottom-right",
                                            autoClose: 5000,
                                            hideProgressBar: true,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                        })
                                    }
                                })
                            },
                            theme: {
                                "color": "#227254"
                            }
                        };
                        var rzp1 = new window.Razorpay(options);
                        rzp1.open();
                    }
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
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
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
                                      null
                                :
                                <div className='col-md-4 col-12' key={index} style={{marginTop:'25px',marginBottom:'25px'}}>
                                    <Card style={{ width: '100%' }}>
                                        <Card.Img variant="top" src={'https://taranjeet10.s3.amazonaws.com/'+item?.eventImages[0]} />
                                        <Card.Body className='cardBody'>
                                            <Card.Title>{item?.eventName}&nbsp;{item?.eventPrice?'(Rs '+item?.eventPrice+')':'(Free)'}</Card.Title>
                                            <Card.Title className='colLittle'>{dateFormatConverter(item?.eventStartDate) +' - '+dateFormatConverter(item?.eventEndDate)}</Card.Title>
                                            <Card.Title className='colLittle'>{item?.location}</Card.Title>
                                            <Card.Text>
                                                {
                                                    item?.eventDescription
                                                }
                                            </Card.Text>
                                                <Button className='formbutton2' onClick={() => {
                                                    if (token) {
                                                            bookedStatus?.length?
                                                                bookedStatus?.map((bookeditem)=>
                                                                    bookeditem?.eventId === item?._id?
                                                                        toast.error('You have already booked this event!', {
                                                                            position: "bottom-right",
                                                                            autoClose: 5000,
                                                                            hideProgressBar: true,
                                                                            closeOnClick: true,
                                                                            pauseOnHover: true,
                                                                            draggable: true,
                                                                            progress: undefined,
                                                                        })
                                                                    :handleBooked(item?._id)
                                                                )
                                                            :item?.users?.length?
                                                                item?.users?.map(itemUser=>
                                                                        itemUser===userActive?
                                                                        toast.error('You have already booked this event!', {
                                                                            position: "bottom-right",
                                                                            autoClose: 5000,
                                                                            hideProgressBar: true,
                                                                            closeOnClick: true,
                                                                            pauseOnHover: true,
                                                                            draggable: true,
                                                                            progress: undefined,
                                                                        })
                                                                        :handleBooked(item?._id)
                                                                )
                                                            :handleBooked(item?._id)
                                                    } else {
                                                        setCookies('WEB_EVENT','/events');
                                                        history.push('/login')
                                                    }
                                                }}>
                                                    {
                                                    bookedStatus?.length?
                                                        bookedStatus?.map((bookeditem)=>
                                                              bookeditem?.eventId === item?._id?
                                                              "Booked"
                                                              :'Book Now'
                                                        )
                                                    :item?.users?.length?
                                                        item?.users?.map(itemUser=>
                                                                itemUser===userActive?
                                                                    'Booked'
                                                                :'Book Now'
                                                        )
                                                    :'Book Now'
                                                    }
                                                </Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                            : null
                    }
                </div>
            </div>
        </div>
    )
}
export default Events;