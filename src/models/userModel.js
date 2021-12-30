const mongoose = require("mongoose");
const Joi = require("joi");

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		min: 6,
		max: 1024,
	},
	email: {
		type: String,
		required: true,
		min: 6,
		max: 255,
		trim: true,
	},
	created: {
		type: Date,
		default: Date.now,
	},
	updated: Date,
});
module.exports = mongoose.model("User", UserSchema);
