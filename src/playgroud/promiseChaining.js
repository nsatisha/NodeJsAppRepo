require('../db/mongoose')
const user = require('../model/User')


//promise chaning without nesting : syntax differs
user.findByIdAndUpdate('5f62ff98e3a46c323c13c86e',{age:1}).then((result1)=>{
    console.log(result1)
    return user.findByIdAndUpdate('5f6396da0c02934b682fdd52',{age:1})
}).then((result2)=>{
    console.log(result2);
    return user.countDocuments({age:1})
}).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})