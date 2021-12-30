const express = require("express");
const User = require("../models/userModel");
const { registrationValidation, loginValidation } = require('../../validation')

const router = express.Router();

router.post("/register", async (req, res) => {
	//validate before creating a new user
	const {error} = registrationValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message)

  //check if user already exists in db
  const emailExists =await User.findOne({ email: req.body.email })
  if(emailExists) return res.status(400).send('Email already exists')
//creating a new user
	const user = new User({
		...req.body,
	});
	try {
		const savedUser = await user.save();
		res.send(savedUser);
	} catch (err) {
		res.status(400).send(err);
	}
});

module.exports = router;
