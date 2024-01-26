const express = require('express');
const zod = require('zod');
const jwt = require('jsonwebtoken')
const { User } = require('../db');
const { JWT_SECRET } = require('../config');
const userRouter = express.Router();
const {authMiddleware} = require('../middleware.js')

const signupBody = zod.object({
    username:zod.string(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})

const signinBody = zod.object({
    username:zod.string(),
    password:zod.string()
})

const updateBody = zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})

const updateUser = async(req, res) => {
    const {success} = updateBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message:"Error while parsing the information!"
        })
    }

    await User.updateOne(req.body, {_id:req.userId})
    
    res.json({
        message:"Updated successfully!"
    })
}

const postSignup = async(req, res) => {
    const {success} = signupBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message:"Incorrect inputs"
        })
    }
    const existingUser = await User.findOne({username:req.body.username});
    if(existingUser){
        return res.status(411).json({
            message:"This email is already taken by someone or the email entered is wrong!"
        })
    }
    const {username, password, firstName, lastName}= req.body;
    const user = await User.create({
        username,
        password,
        firstName,
        lastName
    })

    const userId = user._id;
    const token = jwt.sign({ userId }, JWT_SECRET);

    res.json({
        message:"User created successfully",
        token:token
    })
}   

const postSignin = async(req, res) => {
    const {success} = signinBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"Inputs are wrong!"
        })
    }

    const {username, password} = req.body;

    const userExist = await User.findOne({username, password});

    if(!userExist){
        return res.status(411).json({
            message:"Use doesnot exist with this email!"
        })
    }

    const token = jwt.sign({userId:userExist._id}, JWT_SECRET );
    res.status(200).json({
        token:token,
        message:"User is successfully loggedin!"
    })
}

const getUser = async(req, res) => {
    const filter = req.query.filter||"";

    const users = await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            }
        },{
            lastName:{
                "$regex":filter
            }
        }]
    })

    res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
}

userRouter
    .route('/')
    .put(updateUser)

userRouter
    .route('/bulk')
    .get(getUser)

userRouter
    .route('/signup')
    .post(postSignup)

userRouter
    .route('/signin')   
    .post(authMiddleware, postSignin) 


module.exports = userRouter

// {
//     "message": "User created successfully",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWIzZTIyNmYyZmNjZTYwYjQ2NmVjMGIiLCJpYXQiOjE3MDYyODc2NTV9.pcsjZbDXnzsu8Q8BW95UsYKWXyb6JBN_QUvvRU1Zsnk"
// }