const Friend = require("../models/friendModel");

//To create a new friend entry
exports.create = (req, res) => {
	const friend = new Friend({
		...req.body,
	});
	friend
		.save()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || "Error occured while creating a new friend entry",
			});
		});
};
//To get all friends from the database
exports.list = (req, res) => {
	Friend.find()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Error occured while retrieving all friend in the database",
			});
		});
};
//To find a single friend from the database
exports.read = (req, res) => {
	Friend.findById(req.params.friendId)
		.then((data) => {
			if (!data) {
				return res.status(404).send({
					message: "Friend with id " + req.params.friendId + " not found",
				});
			}
			res.send(data);
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message:
						"Friend with id " +
						req.params.friendId +
						" not found, cannot update",
				});
			}
			return res.status(500).send({
				message:
					"Friend with id " + req.params.friendId + " not found, cannot update",
			});
		});
};
// Updating a single friend record from the database
exports.update = (req, res) => {
	Friend.findByIdAndUpdate(
		req.params.friendId,
		{
			...req.body,
		},
		{ new: true }
	)
		.then((data) => {
			if (!data) {
				return res.status(404).send({
					message: "Friend with id " + req.params.friendId + " not found",
				});
			}
			res.send(data);
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message:
						"Friend with id " +
						req.params.friendId +
						" not found, cannot update",
				});
			}
			return res.status(500).send({
				message:
					"Friend with id " + req.params.friendId + " not found, cannot update",
			});
		});
};
// To delete a friend record from the database
exports.delete = (req, res) => {
	Friend.findByIdAndRemove(req.params.friendId)
		.then((data) => {
			if (!data) {
				return res.status(404).send({
					message:
						"Friend with " + req.params.friendId + " not found, cannot delete",
				});
			}
			res.send({ message: "Friend record deleted successfully" });
		})
		.catch((err) => {
			if (err.kind === "ObjectId" || err.name === "NotFound") {
				return res.status(404).send({
					message:
						"Friend with " + req.params.friendId + " not found, cannot delete",
				});
			}
		});
};
