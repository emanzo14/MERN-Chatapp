const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const userRoutes = require("./routes/api/users");
const chatRoutes = require("./routes/api/chats");
const messageRoutes = require("./routes/api/messages");

require("dotenv").config();
// Connect to the database
require("./config/database");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", index.html));
});

app.use(require("./config/checkToken"));

app.use("/api/users", userRoutes);

const ensureLoggedIn = require("./config/ensureLoggedIn");
app.use("/api/chats", ensureLoggedIn, chatRoutes);
app.use("/api/messages", ensureLoggedIn, messageRoutes);

const port = 3001;

app.listen(port, function () {
  console.log(`Server.js is running on port ${port}`);
});
