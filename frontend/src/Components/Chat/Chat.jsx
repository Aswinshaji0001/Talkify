import React, { useEffect, useState } from 'react';
import '../Chat/Chat.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Chat = ({ setUser, setProfile }) => {
    const { id } = useParams();
    const value = localStorage.getItem('Auth');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [userid, setUserId] = useState('');

    useEffect(() => {
        getProfile();
        fetchMessages();
    }, []);

    const getProfile = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/profile", {
                headers: { "Authorization": `Bearer ${value}` }
            });
            if (res.status === 201) {
                console.log(res);
                setUserId(res.data.data._id)
                setUser(res.data.data.username);
                setProfile(res.data.data.profile);
            } else {
                alert("Failed to fetch profile");
            }
        } catch (error) {
            console.error("Error fetching profile", error);
        }
    };

    const fetchMessages = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/messages/${id}`, {
                headers: { "Authorization": `Bearer ${value}` }
            });
            if (res.status === 200) {
                setMessages(res.data);
                fetchMessages();
            } else {
                alert("Failed to fetch messages");
            }
        } catch (error) {
            console.error("Error fetching messages", error);
        }
    };

    const sendMessage = async () => {
        if (newMessage.trim()) {
            const currentDate = new Date();
            const indianTime = new Date(currentDate.getTime() + 5.5 * 60 * 60 * 1000);
            const messageData = {
                message: newMessage,
                recieverId: id,
                date: indianTime.toISOString().split('T')[0],
                time: indianTime.toTimeString().split(' ')[0],
            };

            try {
                const res = await axios.post('http://localhost:3000/api/sendmsg', messageData, {
                    headers: { "Authorization": `Bearer ${value}` }
                });
                if (res.status === 201) {
                    setMessages((prevMessages) => [...prevMessages, res.data]); // Add the sent message to the chat
                    setNewMessage(''); // Clear the message input field
                    alert("Message Sent");
                }
            } catch (error) {
                console.error("Error sending message", error);
            }
        }
    };
    
    return (
        <div className="chat-container">
            <div className="chat-header">
                <h3>Chat</h3>
            </div>
            <div className="messages">
                {messages.map((message, index) => (
                    <div
                    
                        key={index}
                        className={`message ${message.senderId === userid ? 'sent' : 'received'}`}
                        
                        
                    >
                        <div
                            className="message-content"
                            style={{
                                alignSelf: message.senderId === userid ? 'flex-end' : 'flex-start',
                            }}
                        >
                            <h2>{message.message} {message.sender} </h2>
                            <span className="time">
                                <h5>{message.date}</h5>
                            </span>
                            <div>
                            <h5>{message.time}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="message-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
