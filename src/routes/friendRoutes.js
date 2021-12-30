const express = require("express");
const friendCtrl = require("../controllers/friendCtrl");

const router = express.Router();

router.route("/").get(friendCtrl.list).post(friendCtrl.create);

router
	.route("/api/friends/:friendId")
	.get(friendCtrl.read)
	.put(friendCtrl.update)
	.delete(friendCtrl.delete);

module.exports = router;
