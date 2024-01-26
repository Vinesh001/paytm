const mongoose = require('mongoose');
const {JWT_SECRET} = require('./config.js')

mongoose.connect(JWT_SECRET)
.then(()=>{
    console.log('Database is connected!')
})
.catch((error)=>{
    console.log({
        message:error.message
    })
})

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minLength:3,
        maxLength:30,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    }
})

const User = mongoose.model('User', userSchema);

module.exports = {
    User,
}