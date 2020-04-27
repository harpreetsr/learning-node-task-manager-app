const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     const message = 'Site is under maintainence, please come back soon!'
//     res.status(503).send(message)
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is running on port ', port)
})


// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async function(){
//     const user = await User.findById('5ea6af115420450b98d0a5e1')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

//main()