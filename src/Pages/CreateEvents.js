import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import {Form} from 'react-bootstrap';
import {postMethod, putMethod} from '../Services/APIServices';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation, BrowserRouter as Router, useHistory} from "react-router-dom";
import {getCookies} from '../Services/Cookies';
toast.configure();
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const CreateEvents = (props) => {
    const query = useQuery();
    const history = useHistory();
    const [token, setToken] = useState('');
    const convertFileToBase64=async(file)=>{
        const arrayImages = [];
        for(let li=0;li<file.length;li++)
        {
            var reader = new FileReader();
            var baseString;
            reader.onloadend = function () {
                baseString = reader.result;
                if(baseString!= null)
                {
                    arrayImages.push(baseString); 
                }
            };
            await reader.readAsDataURL(file[li]);
        }
        return arrayImages;
      }
    const handleForms=async(event)=>{
        event.preventDefault();
        const {eventName, eventDesc, startDate, startTime, endDate, endTime, location, price, images} = event.target.elements;
        let images2 =await convertFileToBase64(images.files);
        const data = {eventName:eventName.value,eventDescription:eventDesc.value,eventStartDate:startDate.value,eventStartTime:startTime.value,eventEndDate:endDate.value,eventEndTime:endTime.value,location:location.value,eventPrice:price.value,eventImages:images2};
       
        if(props?.location?.state?.edit)
        {
            const params={events:query.get('card')};
            putMethod('/api/v1/post/update',data,params).then(response=>{
                if(response.success)
                {
                    toast.success('Successfuly Event Edit!', {
                        position: "bottom-right",
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
            })
        }else{
            await postMethod('/api/v1/post/add',data).then(response => {
                if(response.success)
                {
                    toast.success('Successfully Created Event!', {
                        position: "bottom-right",
                        autoClose: 5000,
                        onClose:()=>{history.push('/events')},
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
            })
        }
    }
    const autoFills=()=>{
           
    };
    useEffect(async() => {
        //await setToken(getCookies('USER_TOKEN'))
        window.scrollTo(0, 0);
        if(props?.location?.state?.edit)
        {
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
                        <h1>{props?.location?.state?.edit?'Edit Event':'Create Event'}</h1>
                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-md-6 col-12 text-center'>
                            <div className="formBox">
                                <Form onSubmit={handleForms}>
                                    <Form.Group controlId="formGroupName">
                                        <Form.Label className='text-left'>Event Name</Form.Label>
                                        <Form.Control type="text" name='eventName' placeholder="Event Name" required/>
                                    </Form.Group>
                                    <Form.Group controlId="formGroupDescription">
                                        <Form.Label>Event Description</Form.Label>
                                        <Form.Control type="text" name='eventDesc' placeholder="Event Description" required/>
                                    </Form.Group>
                                    <Form.Group controlId="formGroupStartDate">
                                        <Form.Label>Start Date</Form.Label>
                                        <Form.Control type="date" name='startDate' placeholder="Start Date" required/>
                                    </Form.Group>
                                    <Form.Group controlId="formGroupStartTime">
                                        <Form.Label>Start Time</Form.Label>
                                        <Form.Control type="time" name='startTime' placeholder="Start Time" required/>
                                    </Form.Group>
                                    <Form.Group controlId="formGroupEndDate">
                                        <Form.Label>End Date</Form.Label>
                                        <Form.Control type="date" name='endDate' placeholder="End Date" required/>
                                    </Form.Group>
                                    <Form.Group controlId="formGroupEndTime">
                                        <Form.Label>End Time</Form.Label>
                                        <Form.Control type="time" name='endTime' placeholder="End Time" required/>
                                    </Form.Group>
                                    <Form.Group controlId="formGroupLocation">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control type="text" name='location' placeholder="Location" required/>
                                    </Form.Group>
                                    <Form.Group controlId="formGroupPrice">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type="number" name='price' placeholder="Price" required/>
                                    </Form.Group>
                                    <Form.Group controlId="formGroupDescription">
                                        <Form.Label>Event Images</Form.Label>
                                        <Form.Control type="file" multiple name='images' placeholder="Event Images" required/>
                                    </Form.Group>
                                    <input type="submit" className='formbutton' value={props?.location?.state?.edit?'Edit Event':'Create Event'} />
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