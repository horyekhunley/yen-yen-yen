const User = require("../models/userModel");

exports.create = (req, res) => {
	const user = new User({
		...req.body,
	});
	user
		.save()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Error occured while creating a new user",
			});
		});
};
//To get all users from the database
exports.list = (req, res) => {
	User.find()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Error occured while retrieving all users in the database",
			});
		});
};
//To find a single user from the database
exports.read = (req, res) => {
	User.findById(req.params.userId)
		.then((data) => {
			if (!data) {
				return res.status(404).send({
					message: "User with id " + req.params.userId + " not found",
				});
			}
			res.send(data);
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message:
						"User with id " + req.params.userId + " not found, cannot update",
				});
			}
			return res.status(500).send({
				message:
					"User with id " + req.params.userId + " not found, cannot update",
			});
		});
};
// Updating a single user record from the database
exports.update = (req, res) => {
	User.findByIdAndUpdate(
		req.params.userId,
		{
			...req.body,
		},
		{ new: true }
	)
		.then((data) => {
			if (!data) {
				return res.status(404).send({
					message: "User with id " + req.params.userId + " not found",
				});
			}
			res.send(data);
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message:
						"User with id " + req.params.userId + " not found, cannot update",
				});
			}
			return res.status(500).send({
				message:
					"User with id " + req.params.userId + " not found, cannot update",
			});
		});
};
// To delete a friend record from the database
exports.delete = (req, res) => {
	User.findByIdAndRemove(req.params.userId)
		.then((data) => {
			if (!data) {
				return res.status(404).send({
					message:
						"user with " + req.params.userId + " not found, cannot delete",
				});
			}
			res.send({ message: "user record deleted successfully" });
		})
		.catch((err) => {
			if (err.kind === "ObjectId" || err.name === "NotFound") {
				return res.status(404).send({
					message:
						"user with " + req.params.userId + " not found, cannot delete",
				});
			}
		});
};
