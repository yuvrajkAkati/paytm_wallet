const mongoose = require("mongoose")


mongoose.connect('mongodb+srv://y6352821:6eXEehaNlKek7xny@paytmnew.152jv.mongodb.net/')

//email,firstname,lastname,password,

const UserSchema = new mongoose.Schema({
    username : String,
    firstName : String,
    lastName : String,
    password : String,
})

const User = mongoose.model('User',UserSchema)

const AccountSchema = new mongoose.Schema({
    userId : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }],
    balance : {
        type : Number,
        required : true
    }
})

const Account = mongoose.model('Account',AccountSchema)

module.exports={
    User,
    Account
}