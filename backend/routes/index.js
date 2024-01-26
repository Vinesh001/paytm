const express = require('express');
const router = express.Router();

router
    .route('/')
    .get((req, res)=>{
        res.json({
            message:"this is from /api/v1"
        })
    })

module.exports={
    router
}    