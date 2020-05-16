const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to:email,
        from:'harpreet@codeoye.com',
        subject:'Thanks for joining us!',
        text:`Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to:email,
        from:'harpreet@codeoye.com',
        subject:'Why you cancelled?',
        text:`It\'s sad to see you go, ${name}! Can you please let us know, why you cancelled?`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}