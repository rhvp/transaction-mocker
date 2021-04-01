const AppError = require('./appError');
const jwt = require('jsonwebtoken');

exports.userAuth = async(req, res, next) => {
    try {
        let auth = req.headers['authorization'];
        if(!auth) return next(new AppError('Please login to access the resource', 401));
        const authorized = jwt.verify(auth, process.env.JWT_SECRET);
        if(authorized.id) {
            req.user = authorized;
            next();
        }
        else return next(new AppError('You are unauthorized to access the resource', 401));
    } catch (error) {
        return next(error);
    }
}