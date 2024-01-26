const express = require('express');
const accountRoute = express.Router();

const testFunction = (req, res) => {
    res.json({
        message:"account route working fine!"
    })
}    
accountRoute
    .route('/')
    .get(testFunction)


module.exports = accountRoute