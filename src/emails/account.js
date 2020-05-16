const sgMail = require('@sendgrid/mail')

const sendGridAPIKey = ''

sgMail.setApiKey(sendGridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to:email,
        from:'info2preet@gmail.com',
        subject:'Thanks for joining us!',
        text:`Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to:email,
        from:'info2preet@gmail.com',
        subject:'Why you cancelled?',
        text:`It\'s sad to see you go, ${name}! Can you please let us know, why you cancelled?`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}

// sgMail.send({
//     to:'info2preet@gmail.com',
//     from:'info2preet@gmail.com',
//     subject:'This is my first creation!',
//     text:'I hope this one actually get to you.'
// })