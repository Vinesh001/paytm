const express = require('express');
const mongoose = require('mongoose')
const { Account } = require('../db');
const { authMiddleware } = require('../middleware');
const accountRoute = express.Router();

const showBalance = async(req, res) => {
    const account = await Account.findOne({userId:req.userId})
    res.json({
        balance:account.balance
    })
}  

const transferMoney = async(req, res) => {
    
    const session = await mongoose.startSession();
    session.startTransaction();

    const {amount, to} = req.body;
    const account = await Account.findOne({userId:req.query.userId}).session(session)
    
    if(!account||account.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({userId:to});

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            messagea:"Invalid account"
        })
    }

    await Account.updateOne({
        userId:req.query.userId
    },{
        $inc:{
            balance: -amount
        }
    }).session(session)

    await Account.updateOne({
        userId:to
    },{
        $inc:{
            balance:amount
        }
    }).session(session)

    await session.commitTransaction();

    res.json({
        message:"Transfer successfully!"
    })
}

accountRoute
    .route('/balance')
    .get(authMiddleware,showBalance)

accountRoute
    .route('/transfer')
    .post(authMiddleware,transferMoney)    


module.exports = accountRoute