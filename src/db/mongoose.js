const mongoose = require('mongoose')
//mongodb://127.0.0.1:27017/task-manager-api
// connect mongoose to mongoDB
mongoose.connect('mongodb+srv://workorderuser:pocMDB@2020@cluster0.p65bt.mongodb.net/task-manager-api?retryWrites=true&w=majority',
                {
                    useNewUrlParser:true, 
                    useCreateIndex:true,
                    useUnifiedTopology:true,
                    useFindAndModify:false
                });
