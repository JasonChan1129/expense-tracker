const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	id: {
		type: Number,
	},
});

module.exports = mongoose.model('Category', categorySchema);
