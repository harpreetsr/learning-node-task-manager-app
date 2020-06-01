const request = require('supertest')
// const jwt = require('jsonwebtoken')
// const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')
const {userOneId, userOne, setupDatabase} = require('./fixtures/db') 

beforeEach(setupDatabase)

test('Should SignUp a new user', async () => {
    const response = await request(app).post('/users').send({
        name:'Harpreet',
        email:'harpreet@codeoye.com',
        password:'HarpreetWP0007!'
    }).expect(201)

    //Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //Assertion about the response
    expect(response.body).toMatchObject({
        user:{
            name: 'Harpreet',
            email:'harpreet@codeoye.com'
        },
        token:user.tokens[0].token
    })

    expect(user.password).not.toBe('HarpreetWP0007!')
})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email:userOne.email,
        password:userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)

})

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email:'mike@example.com',
        password:'nopassword'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload an avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.png')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user field', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name:'Andrew'
        })
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Andrew')
})

test('Should not update invalid user field', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location:'Chandigarh'
        })
        .expect(400)
})

//
// User Test Ideas
//
// Should not signup user with invalid name/email/password
test('Should not signup user with invalid name', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            name:'',
            email:'Invalid_Email',
            password:'invalid'
        })
        .expect(400)
})

test('Should not signup user with invalid email', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            name:'Invalid',
            email:'Invalid_Email',
            password:'invalid'
        })
        .expect(400)
})

test('Should not signup user with invalid password', async () => {
    await request(app)
        .post('/users')
        .send({
            name:'Invalid',
            email:'email@example.com',
            password:'password'
        })
        .expect(400)
})

// Should not update user if unauthenticated
test('Should not update user if unauthenticated', async () => {
    await request(app)
        .patch('/users/me')
        .send({
            name:'Is Updated'
        })
        .expect(401)
})

// Should not update user with invalid name/email/password
test('Should not update user with invalid name', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name:''
        })
        .expect(500)
})

test('Should not update user with invalid email', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            email:'invalid'
        })
        .expect(500)
})

test('Should not update user with invalid password', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            password:'pass'
        })
        .expect(500)
})

// Should not delete user if unauthenticated
test('Should not delete user if unauthenticated', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})
