const db = require("../models");
const Book = db.books;
const sequelize = db.sequelize
const { QueryTypes, Op } = require('sequelize');

// Create a new Book
exports.create = async (req, res) => {
	const bookData = req.body
	if (!bookData.code || !bookData.serialNumber || !bookData.name || !bookData.transaction) {
		res.status(400).send({
			message: "A required field is missing!"
		});
		return;
	}

    try {
        const book = {
            code: bookData.code,
            serialNumber: bookData.serialNumber,
            name: bookData.name,
			transaction: bookData.transaction,
        }
        await Book.create(book)
        res.status(201).send({ message: 'Created a book successfully' })
    } catch (err) {
        res.status(500).send({
            error: err.message || "Some error occurred while creating the book."
        });
    }
}

// Retrieve all books
exports.findAll = (req, res) => {
	condition = req.query
	Book.findAll({ where: condition })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving books."
			});
		});
};

// Retrieve single user with address
exports.findBySerialNumber = (req, res) => {
	const serialNumber = req.params.serialNumber;

	Book.findOne({ where: { serialNumber: serialNumber } })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving book with serial number=" + serialNumber + ", " + err
			});
		});
};

//Delete an user with address
exports.delete = (req, res) => {
	const serialNumber = req.params.serialNumber;

	Book.destroy({
		where: { serialNumber: serialNumber }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Book was deleted successfully!"
				});
			} else {
				res.send({
					message: `Cannot delete book with address=${serialNumber}. Maybe book was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: `Could not delete book with address=${serialNumber}. ${err}`
			});
		});
};





