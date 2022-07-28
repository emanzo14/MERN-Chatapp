const express = require("express");
const asyncHandler = require("express-async-handler");
const Chat = require("../../models/chat");
const User = require("../../models/user");
const Message = require("../../models/message");

const sendMessage = asyncHandler(async (req, res, next) => {
  const { chat, content } = req.body;
  const user = await User.findById(req.user.id);
  const chatId = await Chat.findById(chat);
  let newMessage = await Message.create({
    sender: user.id,
    content,
    chat: chatId,
  });

  try {
    let message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chat, { latestMessage: message });

    res.json(message);
  } catch (err) {
    res.status(400).send(err);
  }
});

const fetchMessages = asyncHandler(async (req, res, next) => {
  const { chatId } = req.params;
  // console.log(chatId);
  const messages = await Message.find({ chat: chatId })
    .populate("sender", "name pic email")
    .populate("chat");
  res.json(messages);
});

module.exports = { sendMessage, fetchMessages };
