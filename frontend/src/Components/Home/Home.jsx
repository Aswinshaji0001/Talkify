import React, { useEffect, useState } from 'react'
import '../Home/Home.scss'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Home = ({ setUser, setProfile }) => {
    const navigate = useNavigate();
    const value = localStorage.getItem('Auth');
    const [chatMembers, setChatMembers] = useState([]);
    const [counts, setCounts] = useState([]);
    const [lmessages, setLmessages] = useState([]);

    useEffect(() => {
        getProfile();
        getMembers();
    }, []);

    const getProfile = async () => {
        if (value !== null) {
            const res = await axios.get("http://localhost:3000/api/profile", {
                headers: { "Authorization": `Bearer ${value}` }
            });
            if (res.status === 201) {
                setUser(res.data.data.username);
                setProfile(res.data.data.profile);
            } else {
                alert("Failed to fetch profile");
            }
        } else {
            navigate("/login");
        }
    };

    const getMembers = async () => {
        const res = await axios.get("http://localhost:3000/api/getmembers", {
            headers: { "Authorization": `Bearer ${value}` }
        });
        if (res.status === 201) {
            console.log(res);
            setChatMembers([...new Map(res.data.chatmembers.map(member => [member._id, member])).values()]);
            setCounts(res.data.counts);
            setLmessages(res.data.lmessages);
        } else {
            alert("Failed to fetch members");
        }
    };
    (lmessages[0]&&console.log(lmessages[0].seen))

    

    return (
        <div className='home'>
            <div className="content">
                <h1 className='heads'>ALL CHATS</h1>
                <div className="user-list">
                    {
                        chatMembers.map((member, ind) =>
                            <div className="user-item" key={member._id}>
                                <div className="profile-pic">
                                    <Link to={`/profile/${member._id}`}><img src={member.profile} alt="user" /></Link>
                                </div>
                                <div className="user">
                                <div className="user-info">
                                    <Link to={`/chat/${member._id}`}><h3>{member.username}</h3></Link>
                                   
                                </div>
                                <div className="user-info2">
                                {counts[ind] > 0 && (
                                        <p><span className='count'>{counts[ind]}</span></p>
                                    )}
                                </div>
                                </div>
                                <p className="cfoot">
                                    {lmessages[ind] ? (
                                        lmessages[ind].seen ? (
                                            <span className='smsg'>{lmessages[ind].message}</span>
                                        ) : (
                                            <span className='msg'>{lmessages[ind].message}</span>
                                        )
                                    ) : (
                                        <span className='no-message'>No messages yet</span>
                                    )}
                                </p>
                            </div>
                        )
                    }
                </div>
                <div className="chat">
                    <Link to="/contacts"><img src="/chat.png" alt="contacts" /></Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
