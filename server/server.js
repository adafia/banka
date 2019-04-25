import express from 'express';
import path from 'path';
import '@babel/polyfill';
import allRoutes from './routes/api/v1';
import allRoutesDb from './routes/api/v2';
import bodyParser from 'body-parser';

const app = express();


// Body Parser Middleware
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// Set a static folder
app.use(express.static(path.join(__dirname, '../ui')));

// All API Routes
app.use('/api/v1/', allRoutes);
app.use('/api/v2/', allRoutesDb);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

export default app;