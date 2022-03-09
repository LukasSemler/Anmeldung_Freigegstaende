import express from 'express';
import path from 'path';
import morgan from 'morgan';
import helmet from 'helmet';
import fileUpload from 'express-fileUpload';
import cors from 'cors';

// require('dotenv').config();
import { config } from 'dotenv';
config();

import customerRoutes from './routes/fach.js';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(fileUpload());


const dirname = path.resolve();

app.use(express.static(path.join(dirname, 'public')));
// app.use(express.json()); // body parser
app.use(express.urlencoded({ extended: false }));
app.use('/', customerRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

console.log('Server started');
