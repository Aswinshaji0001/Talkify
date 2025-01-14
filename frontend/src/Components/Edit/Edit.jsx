import React, { useEffect, useState } from "react";
import "./Edit.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Edit = ({setUser,setProfile}) => {
  const value = localStorage.getItem("Auth");
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    profile: "",
    username: "",
    email: "",
  });
  useEffect(() => {
    getProfile();
    getData();
  }, []);

  const getProfile = async () => {

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
  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/getuser", {headers: { Authorization: `Bearer ${value}` },});
      if (res.status === 201) {
        // Initialize details state with fetched user data
        setDetails(res.data);
      } else {
        alert("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      alert("Error fetching user data");
    }
  };

  // Handle file input (avatar change)
  const handleFile = async (e) => {
    const profile = await convertToBase64(e.target.files[0]);
    setDetails((prev) => ({ ...prev, profile }));
  };

  // Convert file to base64 string
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  }

  // Handle input changes for username and email
  const handleChange = (e) => {
    setDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission (update user)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.put("http://localhost:3000/api/updateuser", details,{headers: { Authorization: `Bearer ${value}` }});
    if (res.status === 201) {
      alert("Edit success");
    } else {
      alert("Failed");
    }
  };
  const handleLogout = ()=>{
    console.log("HAI");
    
    localStorage.removeItem('Auth')
    navigate("/login")
  }
  return (
    <div className="edit">
      <div className="card">
        {/* Card Image Section */}
        <div className="card__img">
          <svg width="100%" xmlns="http://www.w3.org/2000/svg">
            <rect height="450" width="540" fill="#ffffff"></rect>
            <defs>
              <linearGradient gradientTransform="rotate(222,648,379)" y2="100%" y1="0" x2="0" x1="0" gradientUnits="userSpaceOnUse" id="a">
                <stop stopColor="#ffffff" offset="0"></stop>
                <stop stopColor="#00abe4" offset="1"></stop>
              </linearGradient>
              <pattern viewBox="0 0 1080 900" y="0" x="0" height="250" width="300" id="b" patternUnits="userSpaceOnUse">
                <g fillOpacity="0.5">
                  <polygon points="90 150 0 300 180 300" fill="#444"></polygon>
                  <polygon points="90 150 180 0 0 0"></polygon>
                </g>
              </pattern>
            </defs>
            <rect height="100%" width="100%" fill="url(#a)" y="0" x="0"></rect>
            <rect height="100%" width="100%" fill="url(#b)" y="0" x="0"></rect>
          </svg>
        </div>

        {/* Avatar Section */}
        <div className="card__avatar">
          <img
            src={details.profile || "https://via.placeholder.com/128"}
            alt="Avatar"
            onClick={() => document.getElementById("profile").click()} // Trigger the file input on click
            className="card__avatar-img"
          />
          <input
            type="file"
            id="profile"
            name="profile"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFile}
          />
        </div>

        {/* Form Section */}
        <form className="card__form" onSubmit={handleSubmit}>
          <div className="card__input-wrapper">
            <input
              type="text"
              id="username"
              name="username"
              value={details.username} // Bind to details.username
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="card__input-wrapper">
            <input
              type="email"
              id="email"
              name="email"
              value={details.email} // Bind to details.email
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="card__wrapper">
            <button type="submit" className="card__btn card__btn-solid">Save Changes</button>

          </div>
        </form>
        <div className="cardg">
        <button type="submit" className="cardsss" onClick={handleLogout}>LOGOUT</button>
        </div>

      </div>
    </div>
  );
};

export default Edit;
