(function () {
    'use strict';

    const express = require('express');
    const path = require('path');
    const logger = require('morgan');
    const cookieParser = require('cookie-parser');
    const bodyParser = require('body-parser');
    const routes = require('./routes/routes.js');

    const app = express();
    const port = 3000;

    // point for static assets
    app.use(express.static(path.join(__dirname, 'public')));

    // //view handlebars engine setup
    const hbs = require('express-handlebars');
    app.set('views', path.join(__dirname, 'views'));
    app.engine('hbs', hbs({
        extname: 'hbs',
        defaultLayout: 'main',
        layoutsDir: path.join(__dirname, '/views/layouts/')
    }));
    app.set('view engine', 'hbs');

    // //view ejs engine setup
    // app.set('views', path.join(__dirname, '../dist'));
    // app.engine('html', require('ejs').renderFile);
    // app.set('view engine', 'html');

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use('/', routes);

    app.use(cookieParser());

    const server = app.listen(port, function () {
        console.log('Express server listening on port ' + server.address().port);
    });

    module.exports = app;

}());