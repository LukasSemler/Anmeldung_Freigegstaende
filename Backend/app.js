import express from 'express';
import path from 'path';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import { ErrorHandler, NotFoundHandler } from './middleware/index.js';

// require('dotenv').config();
import { config } from 'dotenv';
config();

import customerRoutes from './routes/Router.js';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(fileUpload());

const dirname = path.resolve();

app.use(express.static(path.join(dirname, 'public')));
app.use(express.json()); // body parser
app.use(express.urlencoded({ extended: false }));

//Normale Server-Routen
app.use('/', customerRoutes);

//Middleware-Routen
app.use(ErrorHandler);
app.use(NotFoundHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

console.log('Server started');
