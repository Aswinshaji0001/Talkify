import React, { useEffect, useState } from 'react'
import '../Home/Home.scss'
import axios from 'axios'

const Home = ({ setUser, setProfile }) => {
    const value = localStorage.getItem('Auth')

    useEffect(() => {
        getProfile();
    }, [])

    const getProfile = async () => {
        const res = await axios.get("http://localhost:3000/api/profile", {
            headers: { "Authorization": `Bearer ${value}` }
        })
        if (res.status === 201) {
            setUser(res.data.data.username)
            setProfile(res.data.data.profile)
        } else {
            alert("failed")
        }
    }

    return (
        <div className='home'>
            <div className="content">
                <h1 className='heads'>ALL CHATS</h1>
                <div className="user-list">
                        <div className="user-item">
                            <div className="profile-pic">
                                <img src="/logo.png" alt="user"/>
                            </div>
                            <div className="user-info">
                                <h3>Felix</h3>
                            </div>
                        </div>
                        <div className="user-item">
                            <div className="profile-pic">
                                <img src="/logo.png" alt="user"/>
                            </div>
                            <div className="user-info">
                                <h3>Arjun</h3>
                            </div>
                        </div>
                        <div className="user-item">
                            <div className="profile-pic">
                                <img src="/logo.png" alt="user"/>
                            </div>
                            <div className="user-info">
                                <h3>Annan</h3>
                            </div>
                        </div>
                        <div className="user-item">
                            <div className="profile-pic">
                                <img src="/logo.png" alt="user"/>
                            </div>
                            <div className="user-info">
                                <h3>Broi</h3>
                            </div>
                        </div>
                       
                        
                </div>
                <div className="chat">
                            <img src="/chat.png" alt="" />
                        </div>
            </div>
        </div>
    )
}

export default Home
