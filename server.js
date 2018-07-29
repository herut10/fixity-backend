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


app.use(bodyParser.json());
app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true
}));
app.use(express.static('dist'))
app.use(cookieParser());
app.use(session({
    secret: 'fixity secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));


issueRoutes(app);
userRoutes(app);
commentRoutes(app);

const PORT = process.env.PORT || 3000;


var http = require('http').Server(app);
// var server = require('http').createServer(app);
var io = require('socket.io')(http);
io.on('connection', function (socket) {
    console.log('new connection');
    socket.on('emit_method', function (val) {
        console.log(val);

    })
});


http.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))