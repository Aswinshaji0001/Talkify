import React, { useEffect, useState } from 'react'
import '../Home/Home.scss'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Home = ({ setUser, setProfile }) => {
    const navigate = useNavigate();
    const value = localStorage.getItem('Auth')
    const [chatMembers,setChatMembers]=useState([]);

  

    useEffect(() => {
        getProfile();
        getMembers();
    }, [])

    const getProfile = async () => {
        if(value!==null){
        const res = await axios.get("http://localhost:3000/api/profile", {
            headers: { "Authorization": `Bearer ${value}` }
        })
        if (res.status === 201) {
            setUser(res.data.data.username)
            setProfile(res.data.data.profile)
            }  
         else {
            alert("failed")
        }
        }
    else{
        navigate("/login")
    }

    }
    const getMembers = async()=>{
        const res = await axios.get("http://localhost:3000/api/getmembers",{ headers: { "Authorization": `Bearer ${value}` } })
        if(res.status==201){
            setChatMembers([...new Map(res.data.chatMembers.map(member => [member._id, member])).values()]);
            console.log(res);
        }
        else{
            alert("failed")
        }
    }
console.log(chatMembers);

    return (
        <div className='home'>
            <div className="content">
                <h1 className='heads'>ALL CHATS</h1>
                <div className="user-list">
                    {
                    chatMembers.map((member,ind)=>
                        <div className="user-item">
                            <div className="profile-pic">
                            <Link to={`/profile/${member._id}`}><img src={member.profile} alt="user"/></Link>
                            </div>
                            <div className="user-info">
                                <Link to={`/chat/${member._id}`}><h3>{member.username}</h3></Link>
                            </div>
                        </div>
                            )}     
                </div>
                <div className="chat">
                            <Link to="/contacts"><img src="/chat.png" alt="" /></Link>
                        </div>
            </div>
        </div>
    )
}

export default Home
