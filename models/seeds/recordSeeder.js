const Record = require('../record');
const User = require('../user');
const Category = require('../category');

const userSeeder = require('../seeds/user.json').results;
const recordSeeder = require('../seeds/record.json').results;

const bcrypt = require('bcryptjs');

const db = require('../../config/mongoose');

db.once('open', async () => {
	await Promise.all(
		userSeeder.map(async (seedUser, index) => {
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(seedUser.password, salt);
			const createdUser = await User.create({ ...seedUser, password: hash, id: index + 1 });

			console.log('seed user created');

			const recordSeed = [];
			for await (const record of recordSeeder) {
				const category = await Category.findOne({ id: record.categoryId });
				if (record.userId === createdUser.id) {
					record.userId = createdUser._id;
					record.categoryId = category._id;
					recordSeed.push(record);
				}
			}

			await Record.create(recordSeed);

			console.log('seed record created');
		})
	);

	console.log('all record and user seeder created');
	process.exit();
});
