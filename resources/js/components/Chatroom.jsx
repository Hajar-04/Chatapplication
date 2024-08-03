// Chatroom.jsx

import React, { useState } from 'react';

const Chatroom = () => {
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() === "" && !file) {
            alert("Please enter a message or select a file!");
            return;
        }

        // Assuming messageRequest is a function that handles sending the message
        messageRequest(message, file);

        // Reset states after sending message
        setMessage("");
        setFile(null);
        setFilePreview(null); // Reset image preview if applicable
    };

    // Function to handle file selection, assuming you have it
    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        // SetFile and do other handling as needed
        setFile(selectedFile);
    };

    return (
        <div className="card-footer">
            <div className="container">
                <div className="flex-container">
                    <div className="Left">
                        {/* Icons and search fields if needed */}
                    </div>
                    <div className="Right">
                        <input
                            onChange={(e) => setMessage(e.target.value)}
                            autoComplete="off"
                            type="text"
                            className="form-control"
                            placeholder="Message..."
                            value={message}
                        />
                        <input
                            onChange={handleFileSelect}
                            type="file"
                            className="form-control-file"
                        />
                        <div className="input-group-append">
                            <button onClick={sendMessage} className="btn btn-primary" type="button">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatroom;
