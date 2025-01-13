import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Email from './Components/Email/Email';
import Forgot from './Components/Forgot/Forgot';
import Home from './Components/Home/Home';
import Nav from './Components/Nav/Nav';
import Contacts from './Components/Contacts/Contacts';
import Chat from './Components/Chat/Chat';
import Edit from './Components/Edit/Edit'; 

function App() {
  const [user,setUser]=useState("")
  const [profile,setProfile]=useState("")

  return (
    <>
     <BrowserRouter>
     {user&&<Nav user={user} profile={profile}></Nav>}
     <Routes>
      <Route path='/login' Component={Login}></Route>
      <Route path='/' element={<Home setUser={setUser} setProfile={setProfile}/>}></Route>
      <Route path='/contacts' element={<Contacts setUser={setUser} setProfile={setProfile}/>}></Route>
      <Route path='/chat/:id' element={<Chat setUser={setUser} setProfile={setProfile}/>}></Route>
      <Route path='/signup' Component={Signup}></Route>
      <Route path='/edit' element={<Edit setUser={setUser} setProfile={setProfile}/>}></Route>
      <Route path='/email' Component={Email}></Route>
      <Route path='/forgot' Component={Forgot}></Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
