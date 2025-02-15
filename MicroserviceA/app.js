// Citation for the following code:
// Date: 02/13/2025
// Adapted from:
// Source URLs:
// https://www.geeksforgeeks.org/how-to-send-email-with-nodemailer-using-gmail-account-in-node-js/
// https://zeromq.org/get-started/?language=nodejs&library=zeromqjs#

const zmq = require('zeromq');
const nodemailer = require('nodemailer');

async function runReceives() {
    const sock = new zmq.Reply();

    await sock.bind('tcp://*:5555');

    for await (const [msg] of sock) {
        sendMail(JSON.parse(msg.toString()));
    }
}

runReceives();

function sendMail (data) {
    const name = data.name;
    const email = data.email;
    const comment = data.comment;
    let mailTransporter =
        nodemailer.createTransport(
            {
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: '****',
                    pass: '****',
                    clientId: '****',
                    clientSecret: '****',
                    refreshToken: "****"
                }
            }
        );

    let mailDetails = {
        from: '****@gmail.com',
        to: '****@gmail.com',
        subject: 'You have a new feedback form submission',
        text: `Name: ${name}\nEmail: ${email}\nComment: ${comment}`
    };

    mailTransporter
        .sendMail(mailDetails,
            function (err) {
                if (err) {
                    console.log('Error');
                } else {
                    console.log('Email sent successfully');
                }
            });
}