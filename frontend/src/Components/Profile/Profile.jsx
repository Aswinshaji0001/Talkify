import React, { useEffect, useState } from "react";
import "./Profile.scss";
import axios from "axios";
import { useNavigate,useParams} from "react-router-dom";
import { Link } from "react-router-dom";

const Profile = ({setUser,setProfile}) => {
    const {id} = useParams();
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
      const res = await axios.get(`http://localhost:3000/api/getuserp/${id}`, {headers: { Authorization: `Bearer ${value}` },});
      if (res.status === 201) {
        setDetails(res.data);
      } else {
        alert("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      alert("Error fetching user data");
    }
  };


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
            className="card__avatar-img"
          />
          <input
            type="file"
            id="profile"
            name="profile"
            style={{ display: "none" }}
            accept="image/*"
          />
        </div>

        {/* Form Section */}
        <form className="card__form">
          <div className="card__input-wrapper">
            <input
              type="text"
              id="username"
              name="username"
              value={details.username}
              placeholder="Enter username"
              disabled="true"
              required
            />
          </div>

          <div className="card__input-wrapper">
            <input
              type="email"
              id="email"
              name="email"
              value={details.email}
              placeholder="Enter email"
              disabled="true"

              required
            />
          </div>
          <div className="card__wrapper">
          <Link to={`/chat/${details._id}`}><button type="submit" className="card__btn card__btn-solid">Chat</button></Link>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile
