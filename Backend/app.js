import express from 'express';
import path from 'path';
import morgan from 'morgan';
import helmet from 'helmet';

// require('dotenv').config();
import { config } from 'dotenv';
config();

import customerRoutes from './routes/bla.js';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(morgan('dev'));
app.use(helmet());

const dirname = path.resolve();

app.use(express.static(path.join(dirname, 'public')));
app.use(express.json()); // body parser
app.use('/customers', customerRoutes);
app.use('/demo', (req, res) => res.send('Ok'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

console.log('Server started');
