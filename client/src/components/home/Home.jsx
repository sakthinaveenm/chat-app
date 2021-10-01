import React, { useContext, useState, useEffect } from "react";
import { userContext } from "../../userContext";
import { Link, Redirect } from "react-router-dom";
import Navbar from "../layout/Navbar";
import { CCard, CCardBody } from "@coreui/react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import RoomList from "./RoomList";
import io from "socket.io-client";
import axios from "axios";
let socket;

export default function Home() {
  const ENDPOINT = "localhost:5000/";
  const { user, setUser } = useContext(userContext);
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    socket = io(ENDPOINT);
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("room-created", (room) => {
      setRooms([...rooms, room]);
    });
  }, [rooms]);

  useEffect(() => {
    socket.on("output-rooms", (rooms) => {
      setRooms(rooms);
    });
  }, [room]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("create-room", room);
    console.log(room);
    setRoom("");
  };
  if (!user) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <Navbar />
      <Link to="/login">
        <Button>Login</Button>
      </Link>
      <Link to="/signup">
        <Button>Sign up</Button>
      </Link>
      <CCard style={{ width: "400px" }}>
        <CCardBody>
          welcome {user}
          <form onSubmit={handleSubmit}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label="Enter Room No"
                variant="standard"
                value={room}
                onChange={(e) => {
                  setRoom(e.target.value);
                }}
              />
            </Box>
            <Button type="submit" variant="contained">
              Create Room
            </Button>
          </form>
        </CCardBody>
      </CCard>
      <div>
        <RoomList room={rooms} />;
      </div>
    </div>
  );
}
