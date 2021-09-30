import { Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import io from "socket.io-client";
import { userContext } from "../../userContext";
import Message from "./messages/Messages";

let socket;
export default function Chat() {
  const ENDPOINT = "192.168.2.34:5000/";

  const { user, setUser } = useContext(userContext);
  const { room_id, room_name } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, room_id, () => {
        setMessage("");
      });
    }
  };
  useEffect(() => {
    socket = io(ENDPOINT);
    return () => {
      socket.emit("join", { name: user.name, user_id: user._id, room_id });
    };
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessage([...messages, message]);
    });
  }, [messages]);

  return (
    <div>
      <h1>
        Chat {room_id}
        {room_name}
        <Message messages={messages} user_id={user._id} />
        <form onSubmit={sendMessage}>
          <TextField
            id="standard-basic"
            label="Enter Room No"
            variant="standard"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <Button>Send</Button>
        </form>
      </h1>
    </div>
  );
}
