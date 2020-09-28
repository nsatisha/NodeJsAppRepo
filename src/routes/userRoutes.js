const { request } = require('express');
const express = require('express')
const userrouter = new express.Router()
const User = require('../model/User')


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

userrouter.get('/users',async(request,response)=>{
    // User.find({}).then((users)=>{
    //     response.send(users)
    // }).catch((error)=>{
    //     response.status(500).send(error);
    // });

    // Above code can be  written easliy with Async/Await
    try{
        const users = await User.find({})
        response.send(users)
    }catch(e){
        response.status(400).send(e)
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
module.exports = userrouter