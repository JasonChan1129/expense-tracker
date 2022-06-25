const Category = require('../category');
const categories = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他'];

const db = require('../../config/mongoose');

db.once('open', () => {
	return Promise.all(
		categories.map((category, index) => Category.create({ name: category, id: index + 1 }))
	)
		.then(() => console.log('seed categories created'))
		.catch(err => console.log(err));
});
