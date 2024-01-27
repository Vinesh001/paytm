const mongoose = require('mongoose');
const {MONGO_URI} = require('./config.js')

mongoose.connect(MONGO_URI)
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

const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})

const Account = mongoose.model('Account', accountSchema);


module.exports = {
    User,
    Account
}