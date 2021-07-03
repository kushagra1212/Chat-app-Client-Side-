import {  useState } from "react";
import Styles from './Register.module.css'
import axios from "axios";
import url from '../../url/url'
const Register =({runregister})=>{
    const [name,setname]=useState("");
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [loading,setloading]=useState(false);
    const [err,seterr]=useState({emailerr:false,empty:false});
    
    const registrationhandle=()=>{
 if(email.includes("@") && name && password && email){

setloading(true);
console.log(url);
axios.post(`${url}post`,{
    name:name,password:password,email:email
}).then(()=>{
    console.log("sucessfully registered");
   
    setloading(false);
    seterr({emailerr:false,empty:false});
    alert("You are successfully Registered")
   
    runregister();
}).catch(err=>{
    setloading(false);
    alert("User already exist please choose different username");
    console.log(err,"er")});
 
    }
    else if(!email || !name || !password){
        seterr({emailerr:false,empty:true})
    }
else{
    seterr({emailerr:true,empty:false});
}

}

    return(
    
         <div  className={Styles.form} >
             {loading?<div className={Styles.loader}>Loading...</div>:<>
             <label></label>
             <button onClick={()=>runregister()} className={Styles.backbut}>back</button>
           <div className={Styles.form2}>  <input    type="text"  name="name" placeholder="Enter Username" value={name}  onChange={(e)=>setname(e.target.value.toLowerCase().substr(0,8))}    />
        
        <input   type="email" name="email" value={email}  placeholder="Enter your Email"     onChange={(e)=>setemail(e.target.value)}   />
       {err.emailerr?<h4>Email is incorrect</h4>:null}
        <input  type="password" name="password" placeholder="Enter your Password"  value={password}     onChange={(e)=>setpassword(e.target.value)}  /></div>
             <button className={Styles.submit} onClick={registrationhandle}   >Submit</button>
             {err.empty?<h4>Field can't be Empty</h4>:null}</>}
         </div>
         )
}
export default Register;