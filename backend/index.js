const express = require('express');
const router = require('./routes/index.js');
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json())
app.use('/api/v1', router);

app.get('/', (req, res)=>{
    res.json({
        message:"API works fine!"
    })
})

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
})