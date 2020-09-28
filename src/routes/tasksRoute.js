const express = require('express')
const { Mongoose } = require('mongoose')
const taskrouter = new express.Router()
const Task = require('../model/Task')

// POST request to save the task data
taskrouter.post('/task',async(request,response)=>{
    const task = new Task(request.body);
    // task.save().then((task)=>{
    //     console.log(task)
    //     response.send(task)
    // }).catch((error)=>{
    //     response.status(400).send(error)
    // });

      // Above code can written easliy with Async/Await

      try{
        await task.save()
        response.status(200).send(task)
      }catch(e){
        response.status(400).send(e)
      }
})

//PATCH Http method to update TASK

taskrouter.patch('/task/:id',async(request,response)=>{
    const keys = Object.keys(request.body)
    const taskValidKeys = ['description','completed']
    const isvalidKey = keys.every((update)=> taskValidKeys.includes(update))

    try {
        if (!isvalidKey){
            response.status(400).send({error:'Invalid Key to udapte'})
        }
        const task = await Task.findByIdAndUpdate(request.params.id,request.body,{new:true,runValidators:true})
        if(!task){
            response.status(400).send({error: " Invalid Data"})
        }
        response.status(200).send(task)
    } catch (error) {
        response.status(500).send({error:"Something went wrong ! :( "})
    }
    
})


//Challenge to delete the task

taskrouter.delete('/task/:id',async(request,response)=>{

    try {
        const task = await Task.findByIdAndDelete(request.params.id)
        if(!task){
            response.status(400).send({Error: " No matching found"})
        }
        response.status(200).send(task)
    } catch (error) {
        response.status(500).send({Error:"Something went wrong ! :( "})
    }
    
})

// Read the task info using GET request

taskrouter.get('/tasks',async(request,response)=>{
    try {
        const tasklist = await Task.find({})
        if (!tasklist)
        {
         response.status(400).send({error:'No tasks found !'})
        }
        response.send(tasklist)
    } catch (error) {
        response.status(500).send({error:'Something went wrong'})
}
    
})

taskrouter.get('/tasks/:id',async(request,response)=>{
    const _id = request.params.id;

    // User.findById(_id).then((users)=>{
    //     response.send(users)
    // }).catch((error)=>{
    //     response.status(500).send(error.path+" : is invalid")
    // });

      // Above code can be  written easliy with Async/Await

      try{
        const tasks = await Task.findById(_id)
        response.status(200).send(tasks)
      }catch(e){
          response.status(400).send(e)
      }
})

module.exports = taskrouter