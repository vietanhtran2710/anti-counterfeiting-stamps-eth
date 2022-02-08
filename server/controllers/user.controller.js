const db = require("../models");
const User = db.users;
const sequelize = db.sequelize
const { QueryTypes, Op } = require('sequelize');

// Create a new User
exports.create = async (req, res) => {
	const userData = req.body
	if (!userData.address || !userData.role) {
		res.status(400).send({
			message: "A required field is missing!"
		});
		return;
	}
    try {
        const user = {
            address: userData.address,
            role: userData.role,
        }
        await User.create(user)
        res.status(201).send({ message: 'Create user successfully' })
    } catch (err) {
        res.status(500).send({
            error: err.message || "Some error occurred while creating the account."
        });
    }
}

// Retrieve all users
exports.findAll = (req, res) => {
	condition = req.query
	User.findAll({ where: condition })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving accounts."
			});
		});
};

// Retrieve users with a certain role
exports.findByRole = (req, res) => {
	const role = req.params.role;

	User.findAll({ where: { role: role } })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving accounts."
			});
		});
};

//Delete an user with address
exports.delete = (req, res) => {
	const address = req.params.address;

	User.destroy({
		where: { address: address }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Account was deleted successfully!"
				});
			} else {
				res.send({
					message: `Cannot delete account with address=${address}. Maybe account was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: `Could not delete account with address=${address}. ${err}`
			});
		});
};





