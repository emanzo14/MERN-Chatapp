const asyncHandler = require("express-async-handler");
const Chat = require("../../models/chat");
const User = require("../../models/user");

const createChat = asyncHandler(async (req, res, next) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  console.log(user.id);
  if (!user) {
    res.status(400);
    throw new Error("user does not exist");
  }
  const sessionUser = await User.findById(req.user.id);
  console.log(sessionUser.id);
  // if (sessionUser.chats.includes(userId)) {
  //   res.status(400);
  //   throw new Error("user already in chat");
  // }
  let chat = await Chat.findOne({
    users: { $all: [user.id, sessionUser.id] },
    isGroupChat: false,
  })
    .populate("users", "-password")
    .populate("latestMessage");

  chat = await User.populate(chat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });
  let isChat = await Chat.findOne({
    users: { $all: [user.id, sessionUser.id] },
    isGroupChat: false,
  });
  if (!isChat) {
    const newChat = await Chat.create({
      chatName: `${user.name} & ${sessionUser.name}`,
      users: [user.id, sessionUser.id],
      isGroupChat: false,
    });
    console.log(newChat);
    res.send(newChat);
  } else {
    res.send(isChat);
    console.log("chat already exists");
  }
});

const fetchChats = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const chats = await Chat.find({ users: { $all: [user.id] } })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 })

    .then(async (results) => {
      results = await User.populate(results, {
        path: "latestMessage.sender",
        select: "name pic email",
      });
      res.status(200).send(results);
    });
});

module.exports = { createChat, fetchChats };
