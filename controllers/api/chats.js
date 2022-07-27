const e = require("express");
const asyncHandler = require("express-async-handler");
const Chat = require("../../models/chat");
const User = require("../../models/user");

const createChat = asyncHandler(async (req, res, next) => {
  const { userId } = req.body;
  console.log(userId);
  // const user = await User.findById(userId);
  // console.log(user.id);
  if (!userId) {
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
    users: { $all: [userId, sessionUser.id] },
    isGroupChat: false,
  })
    .populate("users", "-password")
    .populate("latestMessage");

  chat = await User.populate(chat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });
  let isChat = await Chat.findOne({
    users: { $all: [userId, sessionUser.id] },
    isGroupChat: false,
  });
  if (!isChat) {
    const newChat = await Chat.create({
      chatName: `${userId.name} & ${sessionUser.name}`,
      users: [userId, sessionUser.id],
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

const createGroupChat = asyncHandler(async (req, res, next) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send("Fill all fields");
  }
  let users = JSON.parse(req.body.users);
  if (users.length < 2) {
    return res.status(400).send("At least 2 Users are required");
  }
  users.push(req.user);
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const newGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")

      .populate("latestMessage");
    res.status(200).json(newGroupChat);
  } catch (error) {
    res.status(400).send(error);
  }
});

const renameGroupChat = asyncHandler(async (req, res, next) => {
  const { chatId, chatName } = req.body;
  const chat = await Chat.findByIdAndUpdate(chatId, { chatName }, { new: true })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!chat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(chat);
  }
});

const addUserToGroupChat = asyncHandler(async (req, res, next) => {
  const { chatId, userId } = req.body;
  const add = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!add) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(add);
  }
});

const removeUserFromGroupChat = asyncHandler(async (req, res, next) => {
  const { chatId, userId } = req.body;
  const remove = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")

    .populate("groupAdmin", "-password");

  if (!remove) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(remove);
  }
});

module.exports = {
  createChat,
  fetchChats,
  createGroupChat,
  renameGroupChat,
  addUserToGroupChat,
  removeUserFromGroupChat,
};
