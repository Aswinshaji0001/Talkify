import React, { useEffect, useState } from 'react';
import '../Chat/Chat.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Chat = ({ setUser, setProfile }) => {
    const { id } = useParams();
    const value = localStorage.getItem('Auth');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [userid, setUserId] = useState('');
    const [pressTimer, setPressTimer] = useState(null); // To track long press timer

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
                setUserId(res.data.data._id);
                setUser(res.data.data.username);
                setProfile(res.data.data.profile);
            } else {
                toast.error("Failed to fetch profile");
            }
        } catch (error) {
            console.error("Error fetching profile", error);
            toast.error("Error fetching profile");
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
                toast.error("Failed to fetch messages");
            }
        } catch (error) {
            console.error("Error fetching messages", error);
            toast.error("Error fetching messages");
        }
    };

    const sendMessage = async () => {
        if (newMessage.trim()) {
            const currentDate = new Date();
            const [date, time] = currentDate.toLocaleString().split(', ');
            const messageData = {
                message: newMessage,
                recieverId: id,
                date: date,
                time: time,
            };

            try {
                const res = await axios.post('http://localhost:3000/api/sendmsg', messageData, {
                    headers: { "Authorization": `Bearer ${value}` }
                });
                if (res.status === 201) {
                    setMessages((prevMessages) => [...prevMessages, res.data]);
                    setNewMessage('');
                    // Show success toast after sending the message
                    toast.success('Message sent successfully', {
                        position: "top-center",  // Center the toast
                        autoClose: 100,         // Set auto close delay (3 seconds)
                        hideProgressBar: true,   // Hide progress bar
                        closeButton: false,      // Optionally hide the close button
                        draggable: false,        // Disable dragging
                        theme: "light"           // Use light theme
                    });
                }
            } catch (error) {
                console.error("Error sending message", error);
                toast.error("Error sending message");
            }
        }
    };

    const deleteMessage = async (mid) => {
        try {
            const res = await axios.delete(`http://localhost:3000/api/deletemsg/${mid}`, {
                headers: { "Authorization": `Bearer ${value}` }
            });
            if (res.status === 201) {
                setMessages((prevMessages) => prevMessages.filter(msg => msg._id !== mid));
                toast.success("Message deleted successfully");
            }
        } catch (error) {
            console.error("Error deleting message", error);
            toast.error("Error deleting message");
        }
    };

    const handleLongPressStart = (mid, senderId) => {
        if (senderId === userid) {
            const timer = setTimeout(() => {
                toast.info(
                    <div className="deletediv">
                        <p>Do you want to delete this message?</p>
                        <button onClick={() => deleteMessage(mid)} className="toast-delete-button">
                            Delete
                        </button>
                    </div>,
                    {
                        position: "top-center",
                        autoClose: true,
                        closeOnClick: true,
                        draggable: false,
                    }
                );
            }, 500); // Trigger after 500ms
            setPressTimer(timer);
        }
    };

    const handleLongPressEnd = () => {
        if (pressTimer) {
            clearTimeout(pressTimer);
            setPressTimer(null);
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
                        onMouseDown={() => handleLongPressStart(message._id, message.senderId)}
                        onMouseUp={handleLongPressEnd}
                        onMouseLeave={handleLongPressEnd}
                        onTouchStart={() => handleLongPressStart(message._id, message.senderId)}
                        onTouchEnd={handleLongPressEnd}
                    >
                        <div
                            className="message-content"
                            style={{
                                alignSelf: message.senderId === userid ? 'flex-end' : 'flex-start',
                            }}
                        >
                            <h2>{message.message} {message.sender}</h2>
                            <span className="time">
                                <h5></h5>
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
            <ToastContainer />
        </div>
    );
};

export default Chat;
