const http = require('http');
const express = require('express');

const hostname = '127.0.0.1';
const port = 3333;

const es6Renderer = require('express-es6-template-engine');
const morgan = require('morgan');
const logger = morgan('tiny');
const helmet = require('helmet');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cookieParser = require('cookie-parser')

const app = express();

const server = http.createServer(app);

app.engine('html', es6Renderer);

app.set('views', './views');
app.set('view engine', 'html');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logger);
app.use(helmet());
app.use(
    session({
        store: new FileStore(),
        secret: "type something else",
        resave: false,
        saveUninitialized: true,
        is_logged_in: false
    })
);

app.use(cookieParser());


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})

const rootController = require("./routes/index");
const restaurantController = require('./routes/restaurants');
const usersController = require('./routes/users');


app.use('/', rootController);
app.use('/restaurants', restaurantController);
app.use('/users', usersController);
