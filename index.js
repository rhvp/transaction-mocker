require('dotenv').config();
const db = require('./models/index');
const app = require('./app');
const PORT = process.env.PORT || 1900;
// db.sequelize.sync({}).then(() => {
//     console.log("db sync");
// });

app.listen(PORT, () => {
    console.log('Server running on ', PORT);
})
process.on('uncaughtException', err => {
    console.log('Uncaught Exception!! Shutting down process..', err.name, err.message, err.stack);
    process.exit(1);
});

process.on('unhandledRejection', err=>{
    console.log('Unhandled Rejection!!',err.code, err.name, err.message, err.stack);
    process.exit(1);
});