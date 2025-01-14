import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../Contacts/Contacts.scss'
const Contacts = ({ setUser, setProfile }) => {
    const value = localStorage.getItem('Auth')
    const [user,getUsers]=useState([])
    useEffect(() => {
        getProfile();
        getContacts();
    }, [])

    const getProfile = async () => {
        const res = await axios.get("http://localhost:3000/api/profile", { headers: { "Authorization": `Bearer ${value}` }})
        if (res.status === 201) {
            setUser(res.data.data.username)
            setProfile(res.data.data.profile)
        } else {
            alert("failed")
        }
    }
    const getContacts = async () =>{
        const res = await axios.get("http://localhost:3000/api/getallcontacts",{ headers: { "Authorization": `Bearer ${value}` }})
        if(res.status==201){
                getUsers(res.data)
        }
        else{
            alert("Failed")
        }
    }
    console.log(user);
    
  return (
      <div className='contacts'>
            <div className="content">
                <h1 className='heads'>ALL CONTACTS</h1>
                <div className="user-list">
                    {user.map((users)=>(
                        <div className="user-item">
                            <Link to={`/profile/${users._id}`}><div className="profile-pic">
                                <img src={users.profile} alt="user"/>
                            </div></Link>
                            <div className="user-info">
                                <h3><Link to={`/chat/${users._id}`}>{users.username}</Link></h3>
                            </div>
                        </div>
                        ))}    
                </div>
            </div>
        </div>
  )
}

export default Contacts
