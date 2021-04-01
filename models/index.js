'use strict';

// const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;

sequelize = new Sequelize(process.env.POSTGRESS_CLOUD_URL);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require('./user')(sequelize, Sequelize);
db.transactions = require('./transaction')(sequelize, Sequelize);
db.wallets = require('./wallet')(sequelize, Sequelize);

db.transactions.belongsTo(db.users, {
    foreignKey: "userId",
    as: "user"
})

db.wallets.belongsTo(db.users, {
    foreignKey: "userId",
    as: "user"
})

db.sequelize.authenticate().then(() => console.log('PstgrsDb connected....')).catch(err => console.log('Error connecting to pstgrsDb...', err))

module.exports = db;