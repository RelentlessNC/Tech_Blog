const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedPost = require('./postData');

async function seedDatabase() {
    await sequelize.sync({ force: true });
    await seedUser();
    await seedPost();
}

seedDatabase();