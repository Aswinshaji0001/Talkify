import React from 'react'
import '../Nav/Nav.scss'
import { Link } from 'react-router-dom'

const Nav = ({user,profile}) => {
    console.log(user);
    console.log(profile);
    
  return (
    <div className='nav'>
      <nav>
        <div className="left">
            <div className="logo">
                <img src="/logo.png" alt="" />
            </div>
                <Link to="/"><h1 className='monserat'>TALKIFY.com</h1></Link>
        </div>
        <div className="right">
            <h1>{user}</h1>
            <div className="profilee">
                <Link to="/edit"><img src={profile} alt="profile image" /></Link>
            </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav
