const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	id: {
		type: String,
	},
});

module.exports = mongoose.model('Category', categorySchema);
