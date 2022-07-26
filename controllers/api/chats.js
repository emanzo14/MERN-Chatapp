const asyncHandler = require("express-async-handler");
const Chat = require("../../models/chat");
const User = require("../../models/user");
// import { searchUsers } from "./users";

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  console.log(userId);

  if (!userId) {
    console.log("userId is not avalible");
    return res.sendStatus(400);
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-passord")
    .populate("latestMessage");

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
      users: [req.user, _id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);

      const fullChat = await Chat.findOne({ _id: createdChat._id })
        .populate("users", "-passord")
        .populate("latestMessage");

      res.status(200).send(fullChat);
    } catch (error) {}
  }
});

// export function getUser() {
//     const token =
// }

module.exports = { accessChat };
