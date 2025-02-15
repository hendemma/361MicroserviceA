// Citation for the following code:
// Date: 02/13/2025
// Adapted from:
// Source URLs:
// https://zeromq.org/get-started/?language=nodejs&library=zeromqjs#

const zmq = require('zeromq');
const express = require("express");
const path = require('path');
const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', (req) => {
    runSend(JSON.stringify(req.body));
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

async function runSend(data) {
    const sock = new zmq.Request();
    sock.connect('tcp://localhost:5555');

    for (let i = 0; i < 10; i++) {
        await sock.send(data);
    }
}