const validator = require('validator')
const mongoose = require('mongoose')
require('../db/mongoose')

const taskSchema = mongoose.Schema({
    description:{
        type:String,
        trim:true,
        required:true
    },
    completed:{
        type:String,
        default:false
    }
})
const Tasks = mongoose.model('Tasks',taskSchema)
module.exports=Tasks