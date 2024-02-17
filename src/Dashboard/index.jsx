import React, { useState } from 'react';
import './index.css'
import { Camera } from 'lucide-react';
function Dashboard() {
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [message, setMessage] = useState('');

    const handleImageChange = (e) => {
        e.preventDefault(); // Prevent default behavior
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        if (image) {
            formData.append('image', image);
        }

        const response = await fetch('http://localhost:5001/decompose-image', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            setMessage(data.text);
        } else {
            setMessage('Failed to analyze the image. Please try again.');
        }
    };

    // New function to handle drag over event
    const handleDragOver = (e) => {
        e.preventDefault(); // This is necessary to allow the drop event to fire.
    };

    // New function to handle drop event
    const handleDrop = (e) => {
        e.preventDefault(); // Prevent default behavior (Prevent file from being opened)
        handleImageChange(e);
    };

    return (
        <>
        <div className="project-container">
            <div className="project-wrapper">
                <div className="upload-area">
                    <div className="heading">
                        <h1>Recycling</h1>
                    </div>
                    <div className="display-box"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        style={{ border: '2px dashed #000', padding: '20px', cursor: 'pointer' }}>
                        {imageURL && <img src={imageURL} alt="Uploaded" style={{ width: '300px', height: '300px' }} />}
                        {!imageURL && <p>Drag and drop an image here, or click to select a file</p>}
                    </div>
                    <div className="input-way">
                        <input type="file" name="image" onChange={handleImageChange} style={{ display: 'none' }} />
                    </div>
                    <div className="display-way">
                        <textarea value={message} readOnly cols="30" rows="10"className='answer' ></textarea>
                    </div>
                    <div class="buttons">
                        <div class="upload">
                            <button class="upload-button">Choose file</button>
                        </div>
                        <div class="reset">
                            <input type="reset" class="reset-button"/>
                        </div>
                        <div className="check-button">
                            <button onClick={handleSubmit} className='submit-button'>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='mobile-view'>
            <div className="mobile-top">
                <h1>Recycle</h1>
            </div>
            <div className="mobile-center">
                <div className="mobile-center-container">
                </div>
            </div>
            <div className="mobile-bottom">
                <div className="mobile-navigation">
                <Camera size={43} />
                </div>
            </div>
        </div>
        </>
    );
}

export default Dashboard;
