const { Router } = require("express")
const router = Router()
const zod = require('zod')
const { User } = require('../db')
const jwt = require('jsonwebtoken')
const JWT_SECRET = "123456"
const authMiddleware = require('../middleware')
const { Account } =require('../db')
const { json } = require("body-parser")

const schema = zod.object({
    username : zod.string().email(),
    password : zod.string().min(6),
    firstName : zod.string(),
    lastName : zod.string()
})

router.post('/signup',async (req,res) => {
    const user = req.body
    const response1 = schema.safeParse(user)
    const existingUser = await User.findOne({
        username : user.username
    })
    if(existingUser || !response1.success){
        return res.status(411).json({
            "message" : "incorrect inputs / email already in use"
        })
    }

    const newUser = await User.create({
        username : user.username,
        password : user.password,
        firstName : user.firstName,
        lastName : user.lastName,
    })
    
        const userId = newUser._id;
        
        await Account.create({
            userId ,
            balance : 1 + Math.random() * 10000
            })
        
        const token = jwt.sign({
            userId : newUser._id
        },JWT_SECRET)
        return res.status(200).json({
        message : `user created successfully`,
        token : token
    })
})

const signinBody = zod.object({
    username : zod.string().email(),
    password : zod.string().min(6)
})

router.post('/signin',(req,res) => {
    const username = req.body.username
    const password = req.body.password

    const response = signinBody.safeParse(req.body)

    if(!response.success){
        return res.status(411).json({
            msg : "erroneous input"
        })
    }

    User.findOne({
        username : username,
        password : password
    })
    .then(function(value){
        if(value==null){
            return res.status(411).json({
                message: "Error while logging in"
            })
        }
    })
    const userId = req.body._id;

    var token = jwt.sign({userId : req.body._id},JWT_SECRET)
    res.status(200).json({
        token : token
    })
})

const updateBody = zod.object({
    password : zod.string().min(6),
    firstName : zod.string(),
    lastName : zod.string() 
})

router.put('/',authMiddleware, async (req,res) => {
    const response = updateBody.safeParse(req.body)
    const newPassword = req.body.password
    const newfirstName = req.body.firstName
    const newlastName = req.body.lastName

    if(!response.success){
        return res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne({_id : req.userId},req.body)

    req.json({
        message: "Updated successfully"
    })
})

router.get('/bulk', async (req,res) => {
   const filter = req.query.filter || ""

   const users = await User.find({
    $or : [{
        firstName : {"$regex" : filter}
    },{
        lastName : {"$regex" : filter}
    }]
   })

   res.json({
    user : users.map(user => ({
        firstName : user.firstName,
        lastName : user.lastName,
        _id : user._id
    })) 
   })

})

module.exports = router