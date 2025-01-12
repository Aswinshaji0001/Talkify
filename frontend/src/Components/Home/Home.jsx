import React, { useEffect, useState } from 'react'
import '../Home/Home.scss'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Home = ({ setUser, setProfile }) => {
    const navigate = useNavigate();
    const value = localStorage.getItem('Auth')
  

    useEffect(() => {
        getProfile();
    }, [])

    const getProfile = async () => {
        const res = await axios.get("http://localhost:3000/api/profile", {
            headers: { "Authorization": `Bearer ${value}` }
        })
        if (res.status === 201) {
            if(!value){
                navigate("/login")
            }
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
                                <Link to="/chat"><h3>Felix</h3></Link>
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
                            <Link to="/contacts"><img src="/chat.png" alt="" /></Link>
                        </div>
            </div>
        </div>
    )
}

export default Home
