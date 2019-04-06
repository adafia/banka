const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');


const app = express();

// Init Middleware
app.use(logger);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// Set a static folder
app.use(express.static(path.join(__dirname, '../ui')));

//Users API Routes
app.use('/api/users', require('./routes/api/users'))

// Accounts API Routes
app.use('/api/accounts', require('./routes/api/accounts'))


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));