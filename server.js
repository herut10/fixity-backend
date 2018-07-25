'use strict'
<<<<<<< HEAD
const express = require('express')
var cors = require('cors')

var bodyParser = require('body-parser')


const app = express()
app.use(bodyParser.json())
app.use(cors())
=======
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
    cookie: { secure: false }
}));
>>>>>>> eabf1b5ad8794cc8b1b5a04e38b55f3ca0892109

app.get('/', (req, res) => res.send('Hello World!'))

issueRoutes(app);
userRoutes(app);
commentRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))