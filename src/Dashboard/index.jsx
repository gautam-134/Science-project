import React, { useState, useRef } from 'react'; // Import useRef
import './index.css';

function Dashboard() {
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef(null); // Create a ref for the input

    const handleImageChange = (e) => {
        e.preventDefault();
        const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];
        processFile(file);
    };

    const processFile = (file) => {
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageURL(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const formData = new FormData();
    //     if (image) {
    //         formData.append('image', image);
    //     }

    //     const response = await fetch('http://localhost:5001/decompose-image', {
    //         method: 'POST',
    //         body: formData,
    //     });

    //     if (response.ok) {
    //         const data = await response.json();
    //         setMessage(data.text);
    //     } else {
    //         setMessage('Failed to analyze the image. Please try again.');
    //     }
    // };
    const typeMessage = (message) => {
        let i = 0;
        const intervalId = setInterval(() => {
            if (i < message.length) {
                setMessage((prev) => prev + message.charAt(i));
                i++;
            } else {
                clearInterval(intervalId);
            }
        }, 50); // Adjust the speed of typing by changing the interval time
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage(''); // Clear the previous message
        const formData = new FormData();
        if (image) {
            formData.append('image', image);
        }
        try {
            const response = await fetch('http://localhost:5001/decompose-image', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                typeMessage(data.text); // Use the typing function
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            setMessage('Failed to analyze the image. Please try again.');
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleImageChange(e);
    };

    // Function to trigger file input click
    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <>
            <div id="body">
                {/* <div class="image">
                    <form class="file-upload-form">
                        <label for="file" class="file-upload-label">
                            <div class="file-upload-design" onClick={triggerFileInput} onDragOver={handleDragOver}
                                onDrop={handleDrop}>
                                {imageURL ? (
                                    <img src={imageURL} alt="Uploaded" style={{ width: '300px', height: '300px' }} />
                                ) : (
                                    <>
                                        <svg viewBox="0 0 640 512" height="1em"> <path
                                            d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                                        ></path></svg>
                                        <p className="display-box"
                                        >Drag and Drop</p>
                                        <p>or</p>
                                        <span class="browse-button">Browse file</span>
                                    </>
                                )}
                            </div>
                            <input id="file" type="file" onChange={handleImageChange} ref={fileInputRef} style={{ display: 'none' }} />
                        </label>
                    </form>
                    <button class="mobile-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none" class="svg-icon"><g stroke-width="2" stroke-linecap="round" stroke="#fff" fill-rule="evenodd" clip-rule="evenodd"><path d="m4 9c0-1.10457.89543-2 2-2h2l.44721-.89443c.33879-.67757 1.03131-1.10557 1.78889-1.10557h3.5278c.7576 0 1.4501.428 1.7889 1.10557l.4472.89443h2c1.1046 0 2 .89543 2 2v8c0 1.1046-.8954 2-2 2h-12c-1.10457 0-2-.8954-2-2z"></path><path d="m15 13c0 1.6569-1.3431 3-3 3s-3-1.3431-3-3 1.3431-3 3-3 3 1.3431 3 3z"></path></g></svg>
                        <span>Take a Photo</span>
                    </button>
                    <div id="buttons">
                        <button id="button-submit" onClick={handleSubmit}>Submit</button>
                        <button id="button-reset" onClick={() => { setImage(null); setImageURL(null); setMessage(null) }}>Reset</button>
                    </div>
                </div>
                <div class="output">
                    <h2>Welcome To Recycle AI</h2>
                    <hr />
                    <textarea name="" id="message" value={message} cols="30" rows="10">OUTPUT</textarea>
                </div> */}
                <div class="image">
                    <form class="file-upload-form">
                        <label for="file" class="file-upload-label">
                            <div class="file-upload-design" onClick={triggerFileInput} onDragOver={handleDragOver}
                                onDrop={handleDrop}>
                                {imageURL ? (
                                    <img src={imageURL} alt="Uploaded" style={{ width: '300px', height: '300px' }} />
                                ) : (
                                    <>
                                        <svg viewBox="0 0 640 512" height="1em"> <path
                                            d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                                        ></path></svg>
                                        <p className="display-box"
                                        >Drag and Drop</p>
                                        <p>or</p>
                                        <span class="browse-button">Browse file</span>
                                    </>
                                )}
                            </div>
                            <input id="file" type="file" onChange={handleImageChange} ref={fileInputRef} style={{ display: 'none' }} />
                        </label>
                    </form>
                    <div id="buttons">
                        <button id="button-submit" onClick={handleSubmit}>Submit</button>
                        <button id="button-mobile" className='camera'><input id="file" type="file" onChange={handleImageChange} ref={fileInputRef} style={{ display: 'none' }} /><svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M27.75 31.05H8.25C5.4 31.05 3 28.8 3 25.8V14.85C3 12 5.25 9.75 8.25 9.75H10.05L11.4 7.95C12.3 6.75 13.8 6 15.3 6H20.55C22.2 6 23.55 6.75 24.6 7.95L25.95 9.75H27.75C30.75 9.75 33 12 33 14.85V25.95C33 28.8 30.75 31.05 27.75 31.05ZM8.25 12.75C7.05 12.75 6 13.65 6 14.85V25.95C6 27.15 7.05 28.2 8.25 28.2H27.9C29.1 28.2 30.15 27.15 30.15 25.95V14.85C30.15 13.65 29.1 12.6 27.9 12.6H25.5C25.05 12.6 24.6 12.45 24.3 12L22.5 9.75C21.9 9.3 21.3 9 20.7 9H15.3C14.7 9 14.1 9.3 13.65 9.75L11.85 12.15C11.55 12.45 11.1 12.75 10.65 12.75H8.25Z" fill="white" /><path d="M18.0008 26.2496C14.4008 26.2496 11.5508 23.3996 11.5508 19.7996C11.5508 16.1996 14.4008 13.3496 18.0008 13.3496C21.6008 13.3496 24.4508 16.1996 24.4508 19.7996C24.4508 23.2496 21.6008 26.2496 18.0008 26.2496ZM18.0008 16.3496C16.0508 16.3496 14.5508 17.8496 14.5508 19.7996C14.5508 21.7496 16.0508 23.2496 18.0008 23.2496C19.9508 23.2496 21.4508 21.7496 21.4508 19.7996C21.4508 17.8496 19.9508 16.3496 18.0008 16.3496Z" fill="white" /></svg></button>
                        <button id="button-reset" onClick={() => { setImage(null); setImageURL(null); setMessage(null) }}>Reset</button>

                    </div>
                </div>
                <div class="output">
                    <h2>DisposeWise</h2>
                    <hr />
                    <br />
                    <textarea name="" id="" cols="30" rows="10">OUTPUT</textarea>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
