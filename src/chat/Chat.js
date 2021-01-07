import React, { useEffect, useRef, useState } from "react";
import querystring from "query-string";
import io from "socket.io-client";
import chatimg from "./chaticon.png";
import Styles from "./chat.module.css";
import usersicon from './Users-icon.png'
import Users from '../Users/Users'


const ENDPOINT = "https://chat-application11.herokuapp.com/";

//const ENDPOINT = "http://localhost:8000";

var socket;

 


const Chat = ({ location }) => {
  const [mess, setmess] = useState("");

  const [allmess, setallmess] = useState([]);

  const [room, setroom] = useState(Number);
  const [admin, setadmin] = useState([]);
  const [nameusers,setnameusers]=useState([]);
  const [showusers,setshowusers]=useState(false);
  const [content,setcontent]=useState([]);
  console.log(content)
const [loading,setloading]=useState(true);

   const messageEndRef=useRef(null)
   
  useEffect(() => {
    const { name, room } = querystring.parse(location.search);
    
    
   
    socket = io.connect(ENDPOINT);
    socket.emit("join", { name: name, room: room });
    setroom(room);
    socket.on("welcomemessage", (ad) => {
      socket.connected?setloading(false):setloading(true);
      setadmin((oldadmin) => [...oldadmin, ad.mass]);
      setroom(ad.rom);
     
    
    });
    socket.on("messagebroadcast", (ms) => {
      setadmin((oldbroad) => [...oldbroad, ms]);
    });

    socket.on("disconnectedfromallusers", (ma) => {
      setadmin((old) => [...old, ma.msg]);
      setnameusers(ma.afterremoveduser);
    });
  }, [location.search]);

  const getusers=()=>
{
setshowusers(!showusers);
if(showusers)
{
  
  socket.emit('getusers',room);
}

  
    
    
  
   
}
  useEffect(() => {
    socket.on("onotherside", (ma) => {
      setallmess((old) => [
        ...old,
        { messagee: ma.mas, right: false, name: ma.name, bgcol: ma.bgcol },
      ]);

      setcontent((old)=>[...old,{ messagee: ma.mas, right: false, name: ma.name, bgcol: ma.bgcol,room:ma.room }]);
      
    });
    socket.on("onmyside", (ms) => {
      setallmess((old) => [
        ...old,
        { messagee: ms.mas, right: true, name: "you", bgcol: ms.bgcol }
      ]);

      setcontent((old)=>[...old,{ messagee: ms.mas, right: true, name: "you", bgcol: ms.bgcol,room:ms.room }])
    });
    socket.on('hereareusers',(us)=>
    {
   setnameusers(us);
     
    })
    
  
  }, []);
useEffect(()=>{
 if(!loading)  messageEndRef.current.scrollIntoView({behavior:"smooth"})
})
 
    

  const sendbuthandle =async () => {
    if (mess) {
      socket.emit("sendmessage", mess);
      setmess("");
    
    }
    
    
   
  };
if(loading)
{
  return(<div>
    loading
  </div>)
}
  return (
  
  
    <>
    <button className={Styles.usersname} onClick={getusers}><img alt="" src={usersicon} width="30px" height="30px" /></button>
    <div className={Styles.maindiv}>
      <div className={Styles.headerdiv}>
        Chat Room :-{room}{" "}
        <img width="20px" height="20px" src={chatimg} alt="NAN" />
      </div>
      
  <Users nameusers={nameusers} showusers={showusers} />
      <div className={Styles.messagediv}>
        {admin.map((entrymessage, id) => (
          <div key={id} className={Styles.popup}>
            <div>
              <h4 style={{ color: "white" }} key={id}>
                {entrymessage}
              </h4>
            </div>
          </div>
        ))}

        {allmess.map((bd, id) =>
          !bd.right ? (
            <div key={id} className={Styles.message}>
              <div>
                <h6 style={{ backgroundColor: bd.bgcol }}>{`~${bd.name}`}</h6>
                <h4 key={id}>{bd.messagee}</h4>
              </div>
            </div>
          ) : (
            <div key={id} className={Styles.ownmessage}>
              <div>
                <h6 style={{ backgroundColor: bd.bgcol }}>{`~${bd.name}`}</h6>
                <h4 key={id}>{bd.messagee}</h4>
              </div>
            </div>
          )
        )}
        <div ref={messageEndRef}/> 
      </div>

      <div className={Styles.inputdiv}>
        <textarea
          autoFocus
          value={mess}
          onChange={(e) => setmess(e.target.value)}
        />

        <button onClick={sendbuthandle}></button>
      </div>
    </div>
    </> 
  );
};

export default Chat;
