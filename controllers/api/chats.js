const asyncHandler = require("express-async-handler");
const Chat = require("../../models/chat");
const User = require("../../models/user");
// import { searchUsers } from "./users";

const createChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400);
    throw new Error("user id does not exist");
  }

  let isChat = await Chat.findOne({
    isGroupChat: false,
    $and: [{ users: { $in: [userId] } }, { users: { $in: [req.user._id] } }],
  }).populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const chat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.send(chat);
    } catch (err) {
      res.status(400);
      throw new Error(err);
    }
  }
});

module.exports = { createChat };
