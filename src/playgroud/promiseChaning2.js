require('../db/mongoose')
const task = require('../model/Task')

//promise chaining
// task.findByIdAndDelete('5f6399ea5d3c6c45a88b3ca7').then((result)=>{
//     console.log(result)
//     return task.countDocuments({completed:'In Progress'})
// }).then((count)=>{
//     console.log(count)
// }).catch((e)=>{
//     console.log(e)
// })
const findupdate = async(id,status) =>{
    console.log(id,status)
    const task1 = await task.findByIdAndUpdate(id,{completed:status})
    const count = await task.countDocuments({completed:status})
    return count;
}
//5f6399a95d3c6c45a88b3ca5

//Async / Await : Same promise chaining can be written as below.

findupdate('5f6399a95d3c6c45a88b3ca5','completed').then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})