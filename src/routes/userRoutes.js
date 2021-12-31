const express = require("express");
const userCtrl = require("../controllers/userController");

const router = express.Router();

router.route("/api/users").get(userCtrl.list).post(userCtrl.create);

router
	.route("/api/users/:userId")
	.get(userCtrl.find)
	.put(userCtrl.update)
	.delete(userCtrl.delete);

export default router;
