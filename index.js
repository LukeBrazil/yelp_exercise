const http = require('http');
const express = require('express');

const hostname = '127.0.0.1';
const port = 3333;

const es6Renderer = require('express-es6-template-engine');
const morgan = require('morgan');
const logger = morgan('tiny');
const helmet = require('helmet');

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


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})

const rootController = require("./routes/index");
const restaurantController = require('./routes/restaurants');
const usersController = require('./routes/users');


app.use('/', rootController);
app.use('/restaurants', restaurantController);
app.use('/users', usersController);
