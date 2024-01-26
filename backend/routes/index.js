const express = require('express');
const userRouter = require('./user')
const router = express.Router();

router.use('/user', userRouter)
router.get('/', (req, res)=>{
    res.send("this is from index.js")
})

module.exports=router