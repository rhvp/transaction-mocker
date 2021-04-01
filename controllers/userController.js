const AppError = require('../config/appError');
const db = require('../models/index');
const User = db.users;
const Wallet = db.wallets;
const bcrypt = require('bcryptjs');
const _ = require('underscore');
const jwt = require('jsonwebtoken');

exports.signup = async(req, res, next) => {
    try {
        let request = ['firstName', 'lastName', 'email', 'password'];
        request.map(item => {
            if(!req.body[item]) return next(new AppError(`${item} is required`, 400));
        })
        let data = _.pick(req.body, request);
        const emailExists = await User.findOne({where: {email: data.email}});
        if(emailExists) return next(new AppError('You already have an account', 409));
        let hash = bcrypt.hashSync(data.password, 12);
        data.password = hash;
        const user = await User.create(data);
        await Wallet.create({userId: user.id});
        res.status(201).json({
            status: "success",
            data: user
        })
    } catch (error) {
        return next(error);
    }
}

exports.login = async(req, res, next) => {
    try {
        let {email, password} = req.body;
        if(!email || !password) return next(new AppError('email & password required', 400));
        const user = await User.findOne({where: {email}})
        if(!user) return next(new AppError('invalid credentials', 400));
        const correctPassword = bcrypt.compareSync(password, user.password);
        if(!correctPassword) return next(new AppError('invalid credentials', 401)); 
        let signature = {
            id: user.id
        }
        let token = jwt.sign(signature, process.env.JWT_SECRET, {
            expiresIn: "2h"
        });
        res.status(200).json({
            status: 'success',
            data: user,
            token
        })
    } catch (error) {
        return next(error);
    }
}