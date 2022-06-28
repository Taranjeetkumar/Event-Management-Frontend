import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Form } from 'react-bootstrap';
import { getMethod, postMethod, putMethod } from '../Services/APIServices';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation, BrowserRouter as Router, useHistory } from "react-router-dom";
import { getCookies } from '../Services/Cookies';
toast.configure();
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const CreateEvents = (props) => {
    const query = useQuery();
    const history = useHistory();
    const [token, setToken] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventDesc, setEventDesc] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState('');
    const pickMonthArray = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '10', '11', '12'];
    const dateFetch = (value) => {
        let date = new Date(value);
        return date.getUTCFullYear() + '-' + pickMonthArray[(date.getUTCMonth() + 1)] + '-' + (date.getUTCDate() < 10 ? pickMonthArray[date.getUTCDate()] : date.getUTCDate());
    }
    const handleForms = async (event) => {
        event.preventDefault();
        if (props?.location?.state?.edit) {
            const formData = new FormData();
            formData.append('eventName', eventName);
            formData.append('eventDescription', eventDesc);
            formData.append('eventStartDate', startDate);
            formData.append('eventStartTime', startTime);
            formData.append('eventEndDate', endDate);
            formData.append('eventEndTime', endTime);
            formData.append('location', location);
            formData.append('eventPrice', price);
            if(images)
            {
                formData.append('eventImages', images);
            }
            const params = { eventId: query.get('card') };
            putMethod('/api/v1/post/update', formData, params).then(response => {
                if (response.success) {
                    toast.success('Successfuly Event Edit!', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                } else {
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
            })
        } else {

            console.log("Images : ",images);
            const formData = new FormData();
            formData.append('eventName', eventName);
            formData.append('eventDescription', eventDesc);
            formData.append('eventStartDate', startDate);
            formData.append('eventStartTime', startTime);
            formData.append('eventEndDate', endDate);
            formData.append('eventEndTime', endTime);
            formData.append('location', location);
            formData.append('eventPrice', price);
            formData.append('eventImages', images);
            await postMethod('/api/v1/post/add', formData).then(response => {
                if (response.success) {
                    toast.success('Successfully Created Event!', {
                        position: "bottom-right",
                        autoClose: 5000,
                        onClose: () => { history.push('/events') },
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                } else {
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
            })
        }
    }
    const autoFills = async () => {
        await getMethod('/api/v1/post/created/event?eventId='+query.get('events')).then(response => {
            if(response.success)
            {
                setEventName(response.data.eventName);
                setEventDesc(response.data.eventDescription);
                setStartDate(dateFetch(response.data.eventStartDate));
                setStartTime(response.data.eventStartTime);
                setEndDate(dateFetch(response.data.eventEndDate));
                setEndTime(response.data.eventEndTime);
                setLocation(response.data.location);
                setPrice(response.data.eventPrice);
                // setImages(response.data.eventImages);
            }else{
                history.push('/')
            }
        })
    };
    useEffect(async () => {
        //await setToken(getCookies('USER_TOKEN'))
        window.scrollTo(0, 0);
        if (props?.location?.state?.edit) {
            autoFills();
        }
        return () => {
        }
    }, [])
    return (
        <>
            {/* {
                token?
            <> */}
            <Header />
            <div className='container-fluid' style={{ paddingTop: '130px' }}>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <h1>{props?.location?.state?.edit ? 'Edit Event' : 'Create Event'}</h1>
                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-md-6 col-12 text-center'>
                            <div className="formBox">
                                <Form>
                                    <Form.Group controlId="formGroupName">
                                        <Form.Label className='text-left'>Event Name</Form.Label>
                                        <Form.Control type="text" name='eventName' placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
                                    </Form.Group>
                                    <Form.Group controlId="formGroupDescription">
                                        <Form.Label>Event Description</Form.Label>
                                        <Form.Control type="text" name='eventDesc' placeholder="Event Description" value={eventDesc} onChange={(e) => setEventDesc(e.target.value)} required />
                                    </Form.Group>
                                    <Form.Group controlId="formGroupStartDate">
                                        <Form.Label>Start Date</Form.Label>
                                        <Form.Control type="date" name='startDate' placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                                    </Form.Group>
                                    <Form.Group controlId="formGroupStartTime">
                                        <Form.Label>Start Time</Form.Label>
                                        <Form.Control type="time" name='startTime' placeholder="Start Time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                                    </Form.Group>
                                    <Form.Group controlId="formGroupEndDate">
                                        <Form.Label>End Date</Form.Label>
                                        <Form.Control type="date" name='endDate' placeholder="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                                    </Form.Group>
                                    <Form.Group controlId="formGroupEndTime">
                                        <Form.Label>End Time</Form.Label>
                                        <Form.Control type="time" name='endTime' placeholder="End Time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                                    </Form.Group>
                                    <Form.Group controlId="formGroupLocation">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control type="text" name='location' placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
                                    </Form.Group>
                                    <Form.Group controlId="formGroupPrice">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type="number" name='price' placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                                    </Form.Group>
                                    <Form.Group controlId="formGroupDescription">
                                        <Form.Label>Event Images</Form.Label>
                                        <input type="file" name='images' placeholder="Event Images" onChange={(e) => setImages(e.target.files[0])} required />
                                    </Form.Group>
                                    <input type="submit" className='formbutton' value={props?.location?.state?.edit ? 'Edit Event' : 'Create Event'} onClick={(e) => handleForms(e)} />
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            {/* </>
            :history.push('/login')
        } */}
        </>
    )
}
export default CreateEvents;