import React, { useState } from 'react';
import { postMethod, setAuthorizationToken } from '../Services/APIServices';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";
import { setCookies, getCookies} from '../Services/Cookies';
import OtpInput from 'react-otp-input';
toast.configure();
const Account = () => {
    const history = useHistory();
    const [toggle, setToggle] = useState('in');
    const [toggle1, setToggle1] = useState(false);
    const [emailOtp, setEmailOTP] = useState('');
    const [otp, setOtp] = useState('');
    const handleVerifyOTP=(e)=>{
        e.preventDefault();
        if(otp && otp.length===6 && emailOtp)
        {
            const otpData = {email:emailOtp,otp:otp};
            postMethod('/api/v1/user/login', otpData).then(response => {
                if (response.success) {
                    toast.success(response.message, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                    history.push('/login')
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
        }else{
            toast.error('Please Enter The OTP', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }
    const handleLogin = async (event) => {
        event.preventDefault()
        const { email, password } = await event.target.elements;
        const loginData = { email: email.value, password: password.value };
        postMethod('/api/v1/user/login', loginData).then(response => {
            if (response.success) {
                setCookies('USER_TOKEN', response.token);
                setAuthorizationToken(response.token)
                if(getCookies('WEB_EVENT'))
                {
                    history.push(getCookies('WEB_EVENT'))
                }else{
                    history.push('/')
                }
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
    const handleSignUp = async (event) => {
        event.preventDefault()
        const { name, newemail, newpassowrd } = await event.target.elements;
        const signData = { name: name.value, email: newemail.value, password: newpassowrd.value, latitude: '0', longitude: '0' };
        postMethod('/api/v1/user/register', signData).then(response => {
            if (response.success) {
                setEmailOTP(response.data.email)
                setToggle1(true)
                //setCookies('USER_TOKEN', response.token);
                //setAuthorizationToken(response.token);
                //history.push('/');
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
    return (
        <div className='container-fluid' style={{ paddingTop: '70px' }}>
            <div className='container'>
                <div className='row justify-content-center section'>
                    {
                        !toggle1 ?
                            <div className='col-md-6 col-12 text-center' style={{marginTop:toggle==='in'?'65px':'0px'}}>
                                <div className="formBox">
                                    {
                                        toggle === 'in' ?
                                            <form onSubmit={handleLogin}>
                                                <h2>Sign In</h2>
                                                <input type="email" name="email" placeholder="Email Id" required />
                                                <input type="password" name="password" placeholder="Password" required />
                                                <input type="submit" className='formbutton' value="Sign In" />
                                                <p>
                                                    Don't have an account ?
                                                    <span onClick={() => setToggle('up')}> Sign Up.</span>
                                                </p>
                                            </form>
                                            : toggle === 'up' ?
                                                <form onSubmit={handleSignUp}>
                                                    <h2>Sign Up</h2>
                                                    <input type="text" name="name" placeholder="Full Name" required />
                                                    <input type="email" name="newemail" placeholder="Email Id" required />
                                                    <input type="password" name="newpassowrd" placeholder="Password" required />
                                                    <input type="submit" className='formbutton' value="Sign Up" />
                                                    <p>
                                                        Don't have an account ?
                                                        <span onClick={() => setToggle('in')}> Sign In.</span>
                                                    </p>
                                                </form>
                                                : null
                                    }
                                </div>
                            </div>
                            :
                            <div className='col-md-6 col-12 text-center' style={{marginTop:'95px',marginBottom:'95px'}}>
                                <div className='formBox'>
                                    <form>
                                        <h2>OTP Verification</h2>
                                        <div className='row justify-content-center'>
                                            <OtpInput
                                                className='otpInput'
                                                value={otp}
                                                onChange={setOtp}
                                                numInputs={6}
                                                separator={<span>-</span>}
                                            />
                                        </div>
                                        <input type="submit" className='formbutton' onClick={(e)=>handleVerifyOTP(e)} value="OTP Verify" />
                                    </form>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default Account;