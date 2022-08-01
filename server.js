const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const userRoutes = require("./routes/api/users");
const chatRoutes = require("./routes/api/chats");
const messageRoutes = require("./routes/api/messages");

const cors = require("cors");

require("dotenv").config();
// Connect to the database
require("./config/database");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));

app.use(require("./config/checkToken"));

app.use("/api/users", userRoutes);

// const ensureLoggedIn = require("./config/ensureLoggedIn");
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = 3001;

const server = app.listen(PORT, function () {
  console.log(`Server.js is running on port ${PORT}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(`${userData.name} has joined the chat`);
    socket.emit("connected");
  });
  socket.on("join chat", (chatRoom) => {
    socket.join(chatRoom);
    console.log(`User joined ${chatRoom}`);
  });

  socket.on("send message", (message) => {
    let chat = message.chat;
    if (!chat.users) return console.log("No users in chat");

    chat.users.forEach((user) => {
      if (user._id == message.sender._id) return;
      socket.in(user._id).emit("message recieved", message);
    });
  });

  socket.off("setup", () => {
    console.log("USER HAS DISCONNECTED");
    socket.leave(userData._id);
  });
});
