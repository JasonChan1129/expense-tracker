const Record = require('../../models/record');
const Category = require('../../models/category');

const express = require('express');
const category = require('../../models/category');
const router = express.Router();

router.get('/new', (req, res) => {
	res.render('new');
});

router.post('/', (req, res) => {
	const record = req.body;
	const userId = req.user._id;
	Category.findOne({ name: record.category })
		.then(category => {
			const categoryId = category._id;
			console.log(categoryId, userId);
			Record.create({ ...record, categoryId, userId })
				.then(() => res.redirect('/'))
				.catch(err => console.log(err));
		})
		.catch(err => console.log(err));
});

router.delete('/:id', (req, res) => {
	const _id = req.params.id;
	const userId = req.user._id;

	return Record.findOne({ userId, _id })
		.then(record => record.remove())
		.then(() => res.redirect('/'))
		.catch(err => console.log(err));
});

module.exports = router;
