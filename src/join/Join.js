import React, { useState } from "react";
import {  useHistory } from "react-router-dom";
import Register from './register/Register'
import Styles from './join.module.css'
import axios from "axios";
import url from '../url/url';
import ballLoading from './images/Ball-CrossLoading.gif'
const Join = () => {
  const [name, setname] = useState("");
  const [room, setroom] = useState("");
  const [password, setpassword] = useState("");
 
  const [errorname, seterrorname] = useState(null);
  const [errorroom, seterrorroom] = useState(null);
  const [register,setregister]=useState(false);
  const [errorpassword, seterrorpassword] = useState(null);
  const [loading,setloading]=useState(false);
const history=useHistory();

  const submithandle = (e) => {
    setloading(true);
    if (!name ) {
    
      seterrorname("Enter User name ");
      e.preventDefault();
      setloading(false);
    } else seterrorname("");
    if (!password) {
  
      seterrorpassword(`Enter your password`);
      e.preventDefault();
      setloading(false);
    } else seterrorpassword("");

    if (!room) {
  
      seterrorroom("Enter your room");
      e.preventDefault();
      setloading(false);
    } else seterrorroom("");
    if(name && password && room){
 axios.get(`${url}user?name=${name}&password=${password}`).then((res)=>{
  setloading(false);
 
  history.push(`/chat?name=${name}&room=${room}`)

}).catch(err=>{console.log(err)
 setloading(false);
 alert('Please Register First ');
})
    }

  };
const runregister=()=>{
  setregister(!register);
}
  return (
    <>
    {register?<Register  runregister={runregister}   />:

    <div className={Styles.maindiv}>
       {loading?<div className={Styles.loader}></div >:<>
      <div className={Styles.welcome} ><h3>
        <strong> Welcome Back! </strong>
      </h3>
      <h4>Join The Chat Now</h4></div>

    <div className={Styles.form} >
    <input
        type="text"
        placeholder="User name"
        value={name}
        onChange={(e) => setname(e.target.value.toLowerCase().substr(0,8))}
      />
      {<label style={{ color: "red" }}>{errorname}</label>}
      <input
        type="password"
        onChange={(e) => setpassword(e.target.value)}
        placeholder="Enter password"
     /> 
      {<label style={{ margibcolor: "red" }}>{errorpassword}</label>} 
      <input
        type="text"
        value={room}
        placeholder="Enter room number"
        onChange={(e) => {
        
          if(!isNaN(e.target.value))
          setroom(e.target.value.substr(0,5))}}

      />
      {<label style={{ color: "red" }}>{errorroom}</label>}
    </div>

        <button className={Styles.divlogin} onClick={submithandle}>
          {" "}
          Join{" "}
        </button>
 
    
<h5 className={Styles.h5}  >Not Registered yet ?</h5>
      <button onClick={runregister} className={Styles.divsignup}>register</button></>}

    
    </div>}</>
  );
};

export default Join;
