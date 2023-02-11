require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
const cookieParser = require('cookie-parser');

const errorHandler = require('./src/api/v1/middlewares/errorHandler');
const { logger, logEvents } = require('./src/api/v1/middlewares/logEvents');
const mongoose = require('mongoose');
const connectDB = require('./src/config/dbConn');
const PORT = process.env.PORT || 3500;

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
);

process.on('uncaughtException', err => {
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
    process.exit(1);
});

connectDB();
app.use(logger);

//app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const quotes = require('./src/api/v1/routes/quotes');
const users = require('./src/api/v1/routes/auth');
const quotesValidation = require('./src/api/v1/validations/quotesValidation');

app.use('/api/v1/quotes', quotesValidation, quotes);
app.use('/api/v1/auth', users);

app.all('*', (req, res) => {
    res.status(404).json({ error: '404 Not Found'});
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

module.exports = app;