import React, { useState } from 'react'
import '../Forgot/Forgot.scss'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Forgot = () => {
    const navigate = useNavigate();
    const email = localStorage.getItem('email')
    console.log(email);
    
    const [data,setData]=useState({
        email:email,
        password:"",
        cpassword:""
    })
    const handleChange=(e)=>{
        console.log(e.target.value);
        setData((pre)=>({
            ...pre,[e.target.name]:e.target.value
        }))
    }
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const res = await axios.post("http://localhost:3000/api/reset",data,{headers:{"Content-Type":"application/json"}})
        console.log(res);
        if(res.status==200){
            alert("Success")
            navigate("/login")
        } 
        else if(res.status==404){
            alert("Wrong password")
        }
        else{
            alert("Failed")
        }  
    }



  return (
       <div className='forgot'>
<div className="card7">
  <div className="card8">
    <form className="form" onSubmit={handleSubmit}>
    <p id="heading">Reset Password</p>

    <div className="field">
    <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="input-icon">
    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
    </svg>
      <input type="password" className="input-field" placeholder="Password" name='password' id="cpassword" onChange={handleChange}/>
    </div>
    <div className="field">
    <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="input-icon">
    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
    </svg>
      <input type="password" className="input-field" placeholder="CPassword" name='cpassword' id="cpassword" onChange={handleChange}/>
    </div>
    <button className="button3">Submit</button>
</form>
  </div>
    </div>
    </div>
  )
}

export default Forgot
