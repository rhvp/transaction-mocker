const AppError = require('../config/appError');
const db = require('../models/index');
const Transaction = db.transactions;
const Wallet = db.wallets;

exports.sendMoney = async(req, res, next) => {
    try {
        let id = req.user.id;
        let {amount} = req.body;
        if(!amount) return next(new AppError('amount required.', 400));
        const wallet = await Wallet.findOne({where: {userId: id}});
        if(amount > wallet.balance) return next(new AppError('insufficient balance. Please fund account to proceed.', 403));
        let tx = {
            amount,
            type: "debit",
            status: "success",
            userId: id
        }
        const txn = await Transaction.create(tx);
        let balance = wallet.balance - amount;
        await Wallet.update({balance}, {where: {id: wallet.id}});
        res.status(200).json({
            status: "success",
            message: "transaction successful",
            data: txn
        })
    } catch (error) {
        return next(error);
    }
}

exports.deposit = async(req, res, next) => {
    try {
        let id = req.user.id;
        let {amount} = req.body;
        if(!amount) return next(new AppError('amount required.', 400));
        const wallet = await Wallet.findOne({where: {userId: id}});
        let tx = {
            amount,
            type: "credit",
            status: "success",
            userId: id
        }
        const txn = await Transaction.create(tx);
        let balance = wallet.balance + amount;
        await Wallet.update({balance}, {where: {id: wallet.id}});
        res.status(200).json({
            status: "success",
            message: "transaction successful",
            data: txn
        })
    } catch (error) {
        return next(error);
    }
}

exports.getBalance = async(req, res, next) => {
    try {
        let id = req.user.id;
        const wallet = await Wallet.findOne({where: {userId: id}});
        res.status(200).json({
            status: "success",
            data: wallet.balance
        })
    } catch (error) {
        return next(error);
    }
}

exports.getTransactions = async(req, res, next) => {
    try {
        let id = req.user.id;
        const transactions = await Transaction.findAll({where: {userId: id},  order: [
            ['createdAt', 'DESC']
        ]})
        res.status(200).json({
            status: "success",
            data: transactions
        })
    } catch (error) {
        return next(error);
    }
}