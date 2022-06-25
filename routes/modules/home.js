const Record = require('../../models/record');
const Category = require('../../models/category');

const express = require('express');
const router = express.Router();

const icons = require('../../public/icon');
const record = require('../../models/record');

router.get('/', (req, res) => {
	Record.find({})
		.populate('categoryId')
		.lean()
		.then(records => {
			let totalAmount = 0;
			records.forEach(record => {
				// transform ISO date to YYYY - MM - DD
				let date = new Date(record.date);
				date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
				record.date = date;
				// get the icon HTML
				record.icon = icons[record.categoryId.name];
				// add total
				totalAmount += record.amount;
			});
			res.render('index', { records, totalAmount });
		})
		.catch(err => console.log(err));
});

router.post('/filter', (req, res) => {
	const filter = req.body.select;
	Category.findOne({ name: filter })
		.then(category => {
			Record.find({ categoryId: category._id })
				.lean()
				.then(records => {
					let totalAmount = 0;
					records.forEach(record => {
						// transform ISO date to YYYY - MM - DD
						let date = new Date(record.date);
						date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
						record.date = date;
						// get the icon HTML
						record.icon = icons[category.name];
						// add total
						totalAmount += record.amount;
					});
					console.log(records);
					res.render('index', { records, totalAmount });
				})
				.catch(err => console.log(err));
		})
		.catch(err => console.log(err));
});

module.exports = router;
