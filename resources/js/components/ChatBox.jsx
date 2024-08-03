import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Message from "./Message.jsx";
import MessageInput from "./MessageInput.jsx";

const ChatBox = ({ rootUrl, selectedUserId }) => {

    const userData = document.getElementById('main')
        .getAttribute('data-user');

    const user = JSON.parse(userData);
    const webSocketChannel = `channel_for_everyone`;

    const [messages, setMessages] = useState([]);

    const scroll = useRef();

    const scrollToBottom = () => {
        scroll.current.scrollIntoView({ behavior: "smooth" });
    };

    const connectWebSocket = () => {
        window.Echo.private(webSocketChannel)
            .listen('GotMessage', async (e) => {
                await getMessages();
            });
    }

    const getMessages = async () => {
        try {
            if (selectedUserId) {
                const m = await axios.get(`${rootUrl}/messages/${selectedUserId}`);
                setMessages(m.data);
                setTimeout(scrollToBottom, 0);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    // Fonction pour gérer un message envoyé
    const handleMessageSent = (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        scrollToBottom();
    };

    useEffect(() => {
        getMessages();
        connectWebSocket();

        return () => {
            window.Echo.leave(webSocketChannel);
        }
    }, [selectedUserId]);

    return (
        <div className="row justify-content-center">
        <div className="col-md-8">
            <div className="card">
                <div className="card-header">
                    {selectedUserId ? `Chat avec l'utilisateur ${selectedUserId}` : user.name}
                </div>
                <div className="card-body" style={{ height: "500px", width: "1277px", marginTop: "10px", overflowY: "auto" }}>
                    {messages?.map((message) => (
                        <Message key={message.id}
                            userId={user.id}
                            message={message}
                        />
                    ))}
                    <span ref={scroll}></span>
                </div>
                <div className="card-footer">
                    <MessageInput rootUrl={rootUrl} onMessageSent={handleMessageSent} />
                </div>
            </div>
        </div>
    </div>
    );
};

export default ChatBox;
