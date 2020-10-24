const validator = require('validator')
const mongoose = require('mongoose')
require('../db/mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error("Invalid Age")
            }
        }

    },
    emailId:{
        type:String,
        trim:true,
        lowercase:true,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Provide valid email ID')
            }
        }
    },
    passowrd:{
        type:String,
        required: true,
        trim:true,
        minlength:6,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain password')
            }
        }

    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    avatar:{
        type:Buffer
    }
})

//middleware pre function to execute for password hasing

userSchema.pre('save', async function(err,doc,next){
    
 user = this
    if(user.isModified('passowrd')){
        user.passowrd = await bcrypt.hash(user.passowrd,8)
    }
    next()
})


//generate Auth Token
userSchema.methods.generateJWTAuthToken = async function() {
    const user = this

    const token = jwt.sign({_id:user._id.toString()},"hello")
    
    //save user token to db
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

//userlogin
userSchema.statics.findUser = async (email, passowrd) =>{
    const user = await User.findOne({emailId:email})
    
    if(user == 'null'|| !user ){
        throw new Error ('Unable to login1')
    }
    const isUserMatch = bcrypt.compare(passowrd,user.passowrd)
    if(!isUserMatch){
        throw new Error('Unable to login2');
    }
    
    return user
}

//hide the private data
userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()

    delete userObject.passowrd
    delete userObject.tokens
    return userObject
}

// create a User Model
const User = mongoose.model('User',userSchema)

module.exports=User;