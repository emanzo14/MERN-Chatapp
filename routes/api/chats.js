const express = require("express");
const router = express.Router();
const chatsCtrl = require("../../controllers/api/chats");
const auth = require("../../middleware/authMiddleware");

router.post("/", auth.protect, chatsCtrl.createChat);
router.get("/", auth.protect, chatsCtrl.fetchChats);

module.exports = router;
