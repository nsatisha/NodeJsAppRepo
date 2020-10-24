const express = require('express')
const userRoute = require('./routes/userRoutes')
const taskRoute = require('./routes/tasksRoute')
const { response } = require('express')
const jwt = require('jsonwebtoken')

require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

//Express Middleware Function
//commented below sample middleware code as we are using auth middleware in seperate file

// app.use((req,res,next)=>{
//     console.log('Express Middleware ')
//     if(req.method === 'POST' || req.method === 'GET' || req.method === 'PATCH' || req.method === 'DELETE') {
//         res.status(500).send({Error: 'Maintainence Mode'})
//     }else {
//         next()
//     }
// })

app.use(express.json())
app.use(userRoute)
app.use(taskRoute)

app.listen(port,()=>{
    console.log('Server is listening on port :' +port)
})

const myfunction = async () =>{
    const authtoken = jwt.sign({_id:'satish123'},'hello',{expiresIn:'1 day'})
    //console.log(authtoken)

    const authverify = jwt.verify(authtoken,'hello')
    //console.log(authverify)
}

myfunction()






