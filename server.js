'use strict'
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');

const issueRoutes = require('./routes/issueRoutes');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const sharedsession = require("express-socket.io-session");


const issueSockets = require('./sockets/issueSockets')
const userSockets = require('./sockets/userSockets')






app.use(bodyParser.json());
app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true
}));
app.use(express.static('dist'))
app.use(cookieParser());






const PORT = process.env.PORT || 3000;


var http = require('http').Server(app);
// var server = require('http').createServer(app);
var io = require('socket.io')(http);
// Attach session
var serverSession = session({
    secret: 'fixity secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
})

app.use(serverSession);
io.use(sharedsession(serverSession));

issueRoutes(app);
userRoutes(app);
commentRoutes(app);


io.on('connection', function (socket) {
    // console.log(socket.handshake.session);
    socket.handshake.session.blah = 1
    issueSockets(socket, io)
    userSockets(socket, io)


    console.log('new connection');
    socket.on('emit_method', function (val) {
        console.log(val);

    })
});


http.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))