const express = require("express");
const bcrypt = require('bcryptjs')
const User = require("../models/userModel");
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { registrationValidation, loginValidation } = require('../../validation')

const router = express.Router();

router.post("/register", async (req, res) => {
	//validate before creating a new user
	const {error} = registrationValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message)

  //check if user already exists in db
  const emailExists =await User.findOne({ email: req.body.email })
  if(emailExists) return res.status(400).send('Email already exists')

  //hashing password with bcryptjs
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

//creating a new user
	const user = new User({
		name: req.body.name,
    email: req.body.email,
    password: hashedPassword
	});
	try {
		const savedUser = await user.save();
		res.send({ user: user.name });
	} catch (err) {
		res.status(400).send(err);
	}
});

router.post('/login', async(req, res) => {
  	//validate before creating a new user
	const {error} = loginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message)

    //check if user already exists in db
    const user =await User.findOne({ email: req.body.email })
    if(!user) return res.status(400).send('Email is wrong')
    //check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)

    if(!validPass) return res.status(400).send('Password is wrong')

    //create and use token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    res.header('auth-token', token)

    res.send('Logged in!')
})

module.exports = router;
