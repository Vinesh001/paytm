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
    // console.log('vinesh')
    const session = await mongoose.startSession();
    session.startTransaction();
    
    const {amount, to} = req.body;
    const account = await Account.findOne({userId:req.userId}).session(session)
    
    if(!account||account.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Insufficient balance"
        })
    }
    
    const toAccount = await Account.findOne({userId:to}).session(session);
    // console.log(to)

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            messagea:"Invalid account"
        })
    }

    // console.log("success")
    await Account.updateOne({
        userId:req.userId
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

    // console.log("success")
    await session.commitTransaction();
// console.log("success")
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