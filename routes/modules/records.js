const Record = require('../../models/record');
const Category = require('../../models/category');

const express = require('express');
const router = express.Router();
const convertDate = require('../../utils/convertDate');

router.get('/new', (req, res) => {
	res.render('new');
});

router.get('/edit/:id', (req, res) => {
	const _id = req.params.id;
	const userId = req.user._id;
	return Record.findOne({ _id, userId })
		.populate('categoryId')
		.lean()
		.then(record => {
			let date = new Date(record.date);
			date = convertDate(date);
			record.date = date;
			res.render('edit', { record: { ...record, category: record.categoryId.name } });
		})
		.catch(err => console.log(err));
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

router.put('/:id', (req, res) => {
	const _id = req.params.id;
	const userId = req.user._id;
	const recordForm = req.body;
	Record.findOne({ _id, userId })
		.then(record => {
			for (let key in recordForm) {
				record[key] = recordForm[key];
			}
			record.save();
		})
		.then(() => res.redirect('/'))
		.catch(error => console.log(error));
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
