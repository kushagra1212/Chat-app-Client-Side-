import React, { useEffect, useState } from "react";
import querystring from "query-string";
import io from "socket.io-client";
import chatimg from "./chaticon.png";
import Styles from "./chat.module.css";

const ENDPOINT = "http://localhost:8000";
var socket;

const Chat = ({ location }) => {
  const [mess, setmess] = useState("");

  const [allmess, setallmess] = useState([]);

  const [room, setroom] = useState(Number);
  const [admin, setadmin] = useState([]);
  useEffect(() => {
    const { name, room } = querystring.parse(location.search);

    
    setroom(room);
    socket = io.connect(ENDPOINT);
    socket.emit("join", { name: name, room: room });

    socket.on("welcomemessage", (ad) => {
      setadmin((oldadmin) => [...oldadmin, ad.mass]);
      setroom(ad.rom);
    });
    socket.on("messagebroadcast", (ms) => {
      setadmin((oldbroad) => [...oldbroad, ms]);
    });

    socket.on("disconnectedfromallusers", (msg) => {
      setadmin((old) => [...old, msg]);
    });
  }, [location.search]);

  useEffect(() => {
    socket.on("onotherside", (ma) => {
      setallmess((old) => [
        ...old,
        { messagee: ma.mas, right: false, name: ma.name, bgcol: ma.bgcol },
      ]);
    });
    socket.on("onmyside", (ms) => {
      setallmess((old) => [
        ...old,
        { messagee: ms.mas, right: true, name: "you", bgcol: ms.bgcol },
      ]);
    });
  }, []);

  const sendbuthandle = () => {
    if (mess) socket.emit("sendmessage", mess);

    setmess("");
  };

  return (
    <div className={Styles.maindiv}>
      <div className={Styles.headerdiv}>
        Chat Room :-{room}{" "}
        <img width="20px" height="20px" src={chatimg} alt="NAN" />
      </div>

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
  );
};

export default Chat;
