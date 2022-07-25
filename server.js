const express = require('express')
const https = require('https');
const fs = require('fs');
const { resolve } = require('path')
require('dotenv').config()

const app = express()


const options = {
    pfx: fs.readFileSync('../certificate/serviceapp.p12'),
    passphrase: process.env.SSL_KEY
};

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(resolve(__dirname, './build')))

    app.get('*', (req, res) => {
        res.sendFile(resolve(__dirname, 'build', 'index.html'));
    });
}

var server = https.createServer(options, app);

server.listen(process.env.PORT || 3000, (err) => {
    if (err) { return console.log(err) }
    console.log('ProducerPoint Started...')
})