const express = require("express");
const router = express.Router();
const messageCtrl = require("../../controllers/api/messages");
const auth = require("../../middleware/authMiddleware");

router.post("/", auth.protect, messageCtrl.sendMessage);
// router.get('/:chatId', auth.protect, messageCtrl.fetchMessages);

module.exports = router;
