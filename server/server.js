import express from 'express';
import path from 'path';
import allRoutes from './routes/api';
import bodyParser from 'body-parser'
// import logger from './middleware/logger';


const app = express();

// Init Middleware
// app.use(logger);

// Body Parser Middleware
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// Set a static folder
app.use(express.static(path.join(__dirname, '../ui')));

// All API Routes
app.use('/api/v1/', allRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

export default app;