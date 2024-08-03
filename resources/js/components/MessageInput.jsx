import React, { useState } from "react";
import axios from "axios";

const MessageInput = ({ rootUrl, onMessageSent }) => {
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null); // Pour prévisualiser l'image

    const messageRequest = async (text, file) => {
        try {
            const formData = new FormData();
            formData.append('text', text);
            if (file) formData.append('file', file);

            const response = await axios.post(`${rootUrl}/message`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Appeler la fonction de rappel avec le message envoyé
            if (onMessageSent) {
                onMessageSent(response.data);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() === "" && !file) {
            alert("Please enter a message or select a file!");
            return;
        }

        messageRequest(message, file);
        setMessage("");
        setFile(null);
        setFilePreview(null); // Réinitialiser l'aperçu de l'image
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        // Créer un aperçu de l'image sélectionnée
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setFilePreview(null);
        }
    };

    return (
        <div className="input-group">
            <input
                onChange={(e) => setMessage(e.target.value)}
                autoComplete="off"
                type="text"
                className="form-control"
                placeholder="Message..."
                value={message}
            />
            <input
                type="file"
                id="file-input"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <label htmlFor="file-input">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-record" viewBox="0 0 16 16">
                    <path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8m0 1A5 5 0 1 0 8 3a5 5 0 0 0 0 10"/>
                </svg>
            </label>
            <div className="input-group-append">
                <button onClick={sendMessage} className="btn btn-primary" type="button">Send</button>
            </div>
            {filePreview && (
                <div className="image-preview">
                    <img src={filePreview} alt="Selected" style={{ width: '100px', height: 'auto', marginTop: '10px' }} />
                </div>
            )}
        </div>
    );
};

export default MessageInput;
