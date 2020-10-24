const { request } = require('express');
const express = require('express')
const userrouter = new express.Router()
const User = require('../model/User')
const auth = require('../middleware/auth')
const multer = require('multer')


// POST Request to save the user data
userrouter.post('/user', async(request,response)=>{
    const user = new User(request.body);

    //create a instance of User model to store it 
    // 
    // user.save().then(()=>{
    //     response.send(user)
    // }).catch((e)=>{
    //     response.status(400).send(e);
    // });

    // Above code can written easliy with Async/Await

    try{
        await user.save()
        const userAuthToken = await user.generateJWTAuthToken()
        response.status(201).send({user,userAuthToken})

    }catch(e){
        response.status(400).send(e);
    }
})

//User login

userrouter.post('/users/login', async(request,response)=>{
    try {
        
        const user = await User.findUser(request.body.emailId,request.body.passowrd);
        
        const userAuth = await user.generateJWTAuthToken()
        
        if(!user){
            response.status(400).send()
        }
        response.send({user,userAuth})
    } catch (error) {
        response.status(500).send({Error: 'Unable to login'})    
        //response.status(500).send(error)  
    }
    
})

userrouter.patch('/users/:id', async(request,response)=>{
    const keys = Object.keys(request.body)
    const userKeys = ['age','name','emailId','passowrd']

    const isValidKey = keys.every((update)=> userKeys.includes(update))
    if(!isValidKey){
        return response.status(400).send({error:"Key does not exist !"});
    }

try{
    //const user = await User.findByIdAndUpdate(request.params.id,request.body,{new:true, runValidators:true})
    const user = await User.findById(request.params.id)
    keys.forEach((key)=> user[key] = request.body[key] )
 
    await user.save()
    console.log('After save is called')
    if(!user){
        return response.status(400).send();
    }
    response.send(user);
}catch(e){
    response.status(500).send({error:e})
}

})


// Read the user info using GET request

userrouter.get('/users/me',auth,async(request,response)=>{
    // User.find({}).then((users)=>{
    //     response.send(users)
    // }).catch((error)=>{
    //     response.status(500).send(error);
    // });

    // Above code can be  written easliy with Async/Await
    //commented below code as we are using the auth middleware were user is set in the request
    // try{
    //     const users = await User.find({})
    //     response.send(users)
    // }catch(e){
    //     response.status(400).send(e)
    // }

    response.send(request.user)
    
})
userrouter.post('/users/logout',auth,async(req,res)=>{
    console.log('logout')
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token != req.token
        })

        await req.user.save()
        res.send('Logged Out successfully')
    } catch (error) {
       res.status(500).send() 
    }
})

userrouter.get('/users/:id',async(request,response)=>{
    const _id = request.params.id;

    // User.findById(_id).then((users)=>{
    //     response.send(users)
    // }).catch((error)=>{
    //     response.status(500).send(error.path+" : is invalid")
    // });

      // Above code can be  written easliy with Async/Await

      try{
        const users = await User.findById(_id)
        response.status(200).send(users)
      }catch(e){
          response.status(400).send(e)
      }
})

//File upload using multer
//create instance of multer

const upload = new multer({
    // dest: 'avatar/', commented this line as we are not storing the image/file on filesystem but on to DB
    limits: {
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        // if(!file.originalname.endsWith('pdf')){ //replaced with below regular expression
            if(!file.originalname.match(/\.(doc|docx|png)$/)){
            return cb(new Error('Please upload the valid word file format'))
        }
        cb(undefined,true)
    }
})

// handler to fileupload request
userrouter.post('/upload/me/avatar',auth,upload.single('avatar'),async(req,res)=>{
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.status(200).send()
}, (error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

// handler to fileupload request
userrouter.delete('/delete/me/avatar',auth,async(req,res)=>{
    req.user.avatar = undefined
    req.user.save()
    res.status(200).send()
}, (error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

//read user avatar
userrouter.get('/user/:id/avatar', async(req,res)=>{
    try{
            const user = await User.findById(req.params.id)
            if(!user | !user.avatar){
                throw new Error()
            }

            res.set('Content-type','image/jpg')
            res.status(200).send(user.avatar)
    }catch(e){
        res.status(400).send()
    }

})
module.exports = userrouter