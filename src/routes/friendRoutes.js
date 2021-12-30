const express = require("express");
const friendCtrl = require("../controllers/friendCtrl");
const verify = require('../../privateRoutes')

const router = express.Router();

router.route("/").get(friendCtrl.list, verify).post(friendCtrl.create, verify);

router
	.route("/api/friends/:friendId")
	.get(friendCtrl.read, verify)
	.put(friendCtrl.update, verify)
	.delete(friendCtrl.delete, verify);

module.exports = router;
