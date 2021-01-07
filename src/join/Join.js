import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Register from './register/Register'
import Styles from './join.module.css'
import axios from "axios";
import url from '../url/url';
const Join = () => {
  const [name, setname] = useState("");
  const [room, setroom] = useState("");
  const [password, setpassword] = useState("");
  const [incorrect, setincorrect] = useState(true);
  const [errorname, seterrorname] = useState(null);
  const [errorroom, seterrorroom] = useState(null);
  const [register,setregister]=useState(false);
  const [errorpassword, seterrorpassword] = useState(null);
const history=useHistory();

  const submithandle = (e) => {
    if (!name ) {
      setincorrect(true);
      seterrorname("Enter User name ");
      e.preventDefault();
    } else seterrorname("");
    if (!password) {
      setincorrect(true);
      seterrorpassword(`Enter your password`);
      e.preventDefault();
    } else seterrorpassword("");

    if (!room) {
      setincorrect(true);
      seterrorroom("Enter your room");
      e.preventDefault();
    } else seterrorroom("");
    if(name && password && room){
 axios.get(`${url}/user?name=${name}&password=${password}`).then((res)=>{
  console.log(res.data);
  setincorrect(false);
  history.push(`/chat?name=${name}&room=${room}`)
}).catch(err=>{console.log(err)
setincorrect(true);
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
       
      <h3>
        <strong> Welcome Back! </strong>
      </h3>
      <h4>Join The Chat Now</h4>

      <input
        type="text"
        placeholder="User name"
        value={name}
        onChange={(e) => setname(e.target.value.substr(0,8))}
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

        <button className={Styles.divlogin} onClick={submithandle}>
          {" "}
          Join{" "}
        </button>
 
      <br></br>
<h5>Not Registered yet ?</h5>
      <button onClick={runregister} className={Styles.divsignup}>register</button>

    
    </div>}</>
  );
};

export default Join;
