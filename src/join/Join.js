import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./join.css";
const Join = () => {
  const [name, setname] = useState("");
  const [room, setroom] = useState("");
  //const [password, setpassword] = useState("");
  const [incorrect, setincorrect] = useState(false);
  const [errorname, seterrorname] = useState(null);
  const [errorroom, seterrorroom] = useState(null);
 // const [errorpassword, seterrorpassword] = useState(null);

  useEffect(() => {
    if (room && name ) setincorrect(false);
  }, [room, name]);
  const submithandle = (e) => {
    if (name.length < 2) {
      setincorrect(true);
      seterrorname("User name should be Greater than 2 character");
      e.preventDefault();
    } else seterrorname("");
   /* if (!password) {
      setincorrect(true);
      seterrorpassword(`Enter your password`);
      e.preventDefault();
    } else seterrorpassword("");
*/
    if (!room) {
      setincorrect(true);
      seterrorroom("Enter your room");
      e.preventDefault();
    } else seterrorroom("");
  };

  return (
    <div className="maindiv">
      <h3>
        <strong> Welcome Back! </strong>
      </h3>
      <h4>Join The Chat Now</h4>

      <input
        type="text"
        placeholder="User name"
        onChange={(e) => setname(e.target.value)}
      />
      {<label style={{ color: "red" }}>{errorname}</label>}
   {/*}   <input
        type="password"
        onChange={(e) => setpassword(e.target.value)}
        placeholder="Key"
      />
      {<label style={{ margibcolor: "red" }}>{errorpassword}</label>}  */}
      <input
        type="text"
        placeholder="Enter room number"
        onChange={(e) => setroom(e.target.value)}
      />
      {<label style={{ color: "red" }}>{errorroom}</label>}
      <Link to={incorrect ? "/" : `/chat?name=${name}&room=${room}`}>
        <button className="divlogin" onClick={submithandle}>
          {" "}
          Join{" "}
        </button>
      </Link>

      <button className="divsignup">register</button>
    </div>
  );
};

export default Join;
