const express = require('express');
const app = express();
const AppError = require('./config/appError');
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./config/errorController');
const userRouter = require('./routes/userRoutes');
const transactionRouter = require('./routes/transactionRoutes');

app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(morgan('short'));

app.use('/api/users', userRouter);
app.use('/api/transactions', transactionRouter);


app.use((req, res, next)=>{
    let err = new AppError(`${req.ip} tried to reach a resource at ${req.originalUrl} that is not on this server.`, 404);
    next(err);
});
app.use(errorHandler);
module.exports = app;