const {Router} = require('express')
const router = Router()
const zod= require('zod')
const { User } = require('../db')
const { Account } = require('../db')
const authMiddleware = require('../middleware')
const mongoose = require('mongoose')

router.get('/balance',authMiddleware,async (req,res) => {
   const user = await Account.findOne({userId : req.body.userId})
   res.json({
    balance : user.balance
   })
})

router.post('/transfer',authMiddleware,async  (req,res) => {
    const session = await mongoose.startSession()

    session.startTransaction()
    const amount = req.body.amount
    
    const account = await Account.findOne({userId : req.userId}).session(session)
    if (!account || account.balance < amount){
        await session.abortTransaction()
        return res.status(400).json({
            message: "Insufficient balance"
            })
            }
            
    const toAccount = await Account.findOne({userId : req.body.to}).session(session)

    if(!toAccount){
        await session.abortTransaction()
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    await Account.updateOne({userId : req.userId}, {$inc : { balance : -amount}}).session(session)
    await Account.updateOne({userId : req.body.to}, {$inc : { balance : amount}}).session(session)

    await session.commitTransaction()
    res.json({
        message : "transaction completed"
    })
})

module.exports = router
