const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/users");
// require the authorization middleware function

// POST /api/users
router.post("/", usersCtrl.createUser);

router.post("/login", usersCtrl.authUser);

// router.get("/check-token", ensureLoggedIn, usersCtrl.checkToken);

module.exports = router;
