import React, { useState, useEffect } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import firebase from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './index.css';

function Login() {
    const [phone, setPhone] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [otpSent, setOtpSent] = useState(false); // State to track if OTP is sent
    const navigate = useNavigate();

    useEffect(() => {
        configureCaptcha();
    }, []); // Initialize captcha when the component mounts

    const configureCaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible",
                callback: (response) => {
                    console.log("Recaptcha verified");
                },
                'expired-callback': () => {
                    // Handle expired captcha if needed
                }
            }
        );
    };

    const handleSendOTP = async (e) => {
        e.preventDefault(); // Prevent form submission
        const phoneNumber = "+91" + phone;
        console.log(phoneNumber);
        const appVerifier = window.recaptchaVerifier;
        try {
            const confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
            window.confirmationResult = confirmationResult;
            console.log("OTP has been sent");
            toast.success('OTP sent successfully');
            sessionStorage.setItem('phone', phone);
            setOtpSent(true); // OTP is sent, disable phone input and enable OTP input
        } catch (error) {
            console.error(error);
            toast.error('OTP has not been sent');
            setOtpSent(false); // An error occurred, keep phone input enabled
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault(); // Prevent form submission
        try {
            const userCredential = await window.confirmationResult.confirm(verificationCode);
            const user = userCredential.user;
            console.log('User successfully logged in:', user);
            toast.success('OTP verified successfully');
            navigate('/dashboard'); // Navigate to dashboard on successful verification
        } catch (error) {
            console.error(error);
            toast.error('OTP verification failed');
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="contain-login">
                <div className="login-box card">
                    <h2>Login</h2>
                    <form onSubmit={e => e.preventDefault()}>
                        <div className="user-box">
                            <input
                                type="text"
                                name="phone"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                autoComplete='off'
                                // disabled={otpSent} // Disable phone input if OTP has been sent
                            />
                            <label>Phone No</label>
                        </div>
                        <div className="user-box">
                            <input
                                type="password"
                                name="otp"
                                required
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                disabled={!otpSent} // Enable OTP input only after OTP has been sent
                            />
                            <label>OTP</label>
                        </div>
                        {!otpSent && <a href="#" onClick={handleSendOTP}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Send OTP
                        </a>}
                        {otpSent &&
                            <a href="#" onClick={handleVerifyOTP}>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Verify OTP
                            </a>
                        }
                    </form>
                </div>
            </div>
            <div id="recaptcha-container"></div>
        </>
    );
}

export default Login;
