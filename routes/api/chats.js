const express = require("express");
const router = express.Router();
const chatsCtrl = require("../../controllers/api/chats");

router.post("/", chatsCtrl.accessChat);
// router.get("/", fetchChats);

module.exports = router;
