const authRoutes = require("./routes/authRoutes");
const express = require("express");
var cookieParser = require("cookie-parser");
const cors = require("cors");
var bodyParser = require("body-parser");

app = express();
const corsOption = {
  origin: "http://localhost:3000",
  credential: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOption));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
const PORT = process.env.PORT || 5000;
const { addUser, removeUser, getUser } = require("./helper");
const mongoose = require("mongoose");
app.use(authRoutes);

app.use(express.json());
// app.use(express.urlencoded());

app.use(cookieParser());
const mongodb =
  "mongodb+srv://sakthinaveenm:sakthi123@chatapp.kyxei.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const Room = require("./models/Room");
const Message = require("./models/Message");

mongoose
  .connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongo Connected");
  })
  .catch((err) => console.log(err));

io.on("connection", (socket) => {
  console.log("a user connected" + socket.id);
  Room.find().then((result) => {
    socket.emit("output-rooms", result);
    // console.log("outpur", result);
  });
});
io.on("create-room", (name) => {
  const room = new Room({ name });
  room.save().then((result) => {
    io.emit("room-created", result);
  });
  console.log("result", name);
});

io.on("join", ({ name, user_id, room_id }) => {
  const { error, user } = addUser({
    socket_id: io.id,
    name,
    user_id,
    room_id,
  });
  if (error) {
    console.log("error", error);
  } else {
    console.log("joined user", user);
  }

  io.join(room_id);
});

io.on("sendMessage", (message, room_id, callback) => {
  const user = getUser(io.id);
  const msgToSend = {
    name: user.name,
    user_id: user.user_id,
    room_id,
    text: message,
  };
  console.log(msgToSend);
  const msg = new Message(msgToSend);
  msg
    .save()
    .then(() => {
      io.to(room_id).emit("message", msgToSend);
      // error can be occur in upper side
      callback();
    })
    .catch(() => {
      console.log("Not Entry");
    });
});
io.on("disconnect", () => {
  const user = removeUser(io.id);
});

server.listen(PORT, () => {
  console.log(`listening on : ${PORT}`);
});
