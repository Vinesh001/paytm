const express = require('express');
const userRouter = require('./user')
const accountRoute = require('./account')
const router = express.Router();

router.use('/user', userRouter);
router.use('/account', accountRoute)
router.get('/', (req, res)=>{
    res.send("this is from index.js")
})

module.exports=router