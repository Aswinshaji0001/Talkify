import React from 'react'
import '../Nav/Nav.scss'
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
                <h1 className='monserat'>TALKIFY.com</h1>
        </div>
        <div className="right">
            <h1>{user}</h1>
            <div className="profilee">
                <img src={profile} alt="profile image" />
            </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav
