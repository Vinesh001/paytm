const express = require('express');
const { router } = require('./routes');
const app = express();
const port = 3000;

app.use('/api/v1', router);
app.get('/', (req, res)=>{
    res.json({
        message:"API works fine!"
    })
})

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
})