import express from 'express';
import path from 'path';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { ErrorHandler, NotFoundHandler, HttpsRedirectHandler } from './middleware/index.js';

// require('dotenv').config();
import { config } from 'dotenv';
config();

import customerRoutes from './routes/Router.js';

const PORT = process.env.PORT || 5000;

const app = express();

app.set('trust proxy', 1);

app.use(morgan('dev'));
app.use(cors());
app.use(fileUpload());
app.use(cookieParser());

const dirname = path.resolve();

app.use(express.static(path.join(dirname, 'public')));
app.use(express.json()); // body parser
app.use(express.urlencoded({ extended: false }));

//Middware-Route
app.use(HttpsRedirectHandler); //Wenn der User versucht auf dei Heroku-HTTP-URL zuzugreifen, wird er auf die HTTPS-URL umgeleitet

//Express-Sessions
app.use(
  session({
    secret: 'FreifachAnmeldung',
    secret: 'FreifaecherAmeldung',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  }),
);

//Normale Server-Routen
app.use('/', customerRoutes);

//Middleware-Routes
app.use(ErrorHandler); //Wenn ein Serverfehler vorhanden ist
app.use(NotFoundHandler); //Wenn die Route nicht gefunden wurde

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

console.log('Server started');
