const express = require("express");
const router = express.Router();
const chatsCtrl = require("../../controllers/api/chats");

router.post("/", chatsCtrl.createChat);
// router.get("/", fetchChats);

module.exports = router;
