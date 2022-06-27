const Record = require('../../models/record');
const Category = require('../../models/category');

const express = require('express');
const router = express.Router();

const icons = require('../../public/icon');
const convertDate = require('../../utils/convertDate');

router.get('/', (req, res) => {
	const userId = req.user._id;
	Record.find({ userId })
		.populate('categoryId')
		.lean()
		.then(records => {
			let totalAmount = 0;
			records.forEach(record => {
				// transform ISO date to YYYY - MM - DD
				let date = new Date(record.date);
				date = convertDate(date);
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

router.post('/filter', async (req, res) => {
	const filter = req.body.select;
	const userId = req.user._id;
	let totalAmount = 0;

	if (filter === '全部') {
		return res.redirect('/');
	}
	try {
		const category = await Category.findOne({ name: filter }).lean();
		const records = await Record.find({ categoryId: category._id, userId }).lean();

		records.forEach(record => {
			// transform ISO date to YYYY - MM - DD
			let date = new Date(record.date);
			date = convertDate(date);
			record.date = date;
			// get the icon HTML
			record.icon = icons[category.name];
			// add total
			totalAmount += record.amount;
		});

		res.render('index', { records, totalAmount, category: category.name });
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
