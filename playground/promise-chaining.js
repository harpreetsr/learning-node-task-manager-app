require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('5e9e73e06ad0bd11e0dd3db5', { age:1 }).then((user) => {
    console.log(user)
    return User.countDocuments({age:1})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})