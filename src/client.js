import io from "socket.io-client";

import "bootstrap/dist/css/bootstrap.css";
import "./style.css";
import React from "react";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import moment from "moment";

const room = prompt("Hello ANDi, do you know which room you want?");
const username = prompt("And what is your AND Title?");

const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling"]
});

const App = ({}) => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("user", {room, username});
    });

    socket.on("users" + room, users => {
      setUsers(users);
    });

    socket.on("message" + room, message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on("disconnected", id => {
      setUsers(users => {
        return users.filter(user => user.id !== id);
      });
    });
  }, []);

  const submit = event => {
    event.preventDefault();
    socket.emit("send", {room, message});
    setMessage("");
  };

  return (
    <div className="container">
        <div class="bg"></div>
<div class="bg bg2"></div>
<div class="bg bg3"></div>
<div class="content"></div>
      <div className="row">
        <div className="col-md-12 mt-4 mb-4">
          <h6>Welcome, {username} to room {room}</h6>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <h6>Chat</h6>
          <div id="messages">
            {messages.map(({ user, date, text }, index) => (
              <div key={index} className="row mb-2">
                <div className="col-md-3">
                  {moment(date).format("h:mm:ss a")}
                </div>
                <div className="col-md-2">{user.name}</div>
                <div className="col-md-2">{text}</div>
              </div>
            ))}
          </div>
          <form onSubmit={submit} id="form">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                onChange={e => setMessage(e.currentTarget.value)}
                value={message}
                id="text"
              />
              <span className="input-group-btn">
                <button id="submit" type="submit" className="btn btn-primary">
                  Send
                </button>
              </span>
            </div>
          </form>
        </div>
        <div >
          <a id="premium" href="http://localhost:1234/">
          Want to scroll through messages? Unlock this with the premium pass for 4.99 a month!
          </a>
        </div>
        <div className="col-md-4">
          <h6>ANDIs</h6>
          <ul id="users">
            {users.map(({ name, id }) => (
                <li key={id}>{name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
