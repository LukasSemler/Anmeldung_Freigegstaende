/* eslint-disable import/extensions */
import express from 'express';
import asyncHandler from 'express-async-handler';
import apicache from 'apicache';

// ! _______________________________________________________________________________________________

// Importe für Fach
import {
  fachErstellen,
  fachThumbnailSpeichern,
  fachDel,
  getFreifaecher,
  changeFach,
} from '../controllers/Fach.js';

// ! _______________________________________________________________________________________________

// Import für Schüler
import {
  SchuelerInFreifachAnmelden,
  SchuelerVonFreifachAbmelden,
  getFaecherSchueler,
} from '../controllers/Schueler.js';

// ! _______________________________________________________________________________________________

// Import für Verwaltung
import {
  setFristenChangeTimeLine,
  getAdminTimeLine,
  getFristen,
  lehrerSchülerAnmelden,
  lehrerSchülerAbmelden,
  getFaecherFromStudent,
} from '../controllers/Verwaltung.js';

// ! _______________________________________________________________________________________________

// Import für Admin Time
import { getFaecherAdmin, acceptFach } from '../controllers/Admin.js';

// ! _______________________________________________________________________________________________

// Import für Lehrer

import {
  getFreifaecherLehrer,
  accepDeclineStudent,
  getSchuelerFaecher,
} from '../controllers/Lehrer.js';

// ! _______________________________________________________________________________________________

let cache = apicache.middleware;
const router = express.Router();

const userIsLoggedIn = (req, res, next) => {
  if (req.session.aktiverUser || req.headers.host == 'localhost:2410') next();
  else {
    res.send('User is not logged in!');
  }
};

//* Routen für Fach:
router.post('/fachErstellen', userIsLoggedIn, asyncHandler(fachErstellen));
router.post('/fachThumbnail', userIsLoggedIn, asyncHandler(fachThumbnailSpeichern));
router.delete('/delFach/:id', userIsLoggedIn, asyncHandler(fachDel));
router.get('/getFreifaecher', cache('5 minutes'), asyncHandler(getFreifaecher));
router.patch('/changeFach/:id', userIsLoggedIn, asyncHandler(changeFach));

// ! _______________________________________________________________________________________________

//* Routen für Schüler:
router.post(
  '/SchuelerInFreifachAnmelden',
  userIsLoggedIn,
  asyncHandler(SchuelerInFreifachAnmelden),
);
router.post(
  '/SchuelerInFreifachAbmelden',
  userIsLoggedIn,
  asyncHandler(SchuelerVonFreifachAbmelden),
);
router.get('/getFaecherSchueler/:id', userIsLoggedIn, asyncHandler(getFaecherSchueler));

// ! _______________________________________________________________________________________________

// *Routen für Lehrer
router.get('/getFreifaecherLehrer', asyncHandler(getFreifaecherLehrer));
router.patch('/accepDeclineStudent/:id', userIsLoggedIn, asyncHandler(accepDeclineStudent));
router.get('/getSchuelerFaecher', userIsLoggedIn, asyncHandler(getSchuelerFaecher));

// ! _______________________________________________________________________________________________

//* Routen für Admin
router.get('/getFaecherAdmin', userIsLoggedIn, asyncHandler(getFaecherAdmin));
router.patch('/acceptFach/:id', userIsLoggedIn, asyncHandler(acceptFach));

// ! _______________________________________________________________________________________________

//* Routen für Verwaltung
router.post('/setFristenChangeTimeLine', userIsLoggedIn, asyncHandler(setFristenChangeTimeLine));
router.get('/getAdminTimeLine', userIsLoggedIn, asyncHandler(getAdminTimeLine));
router.get('/getFristen', cache('5 minutes'), asyncHandler(getFristen));
router.post('/lehrerSchuelerAnmelden', asyncHandler(lehrerSchülerAnmelden));
router.post('/lehrerSchuelerAbmelden', asyncHandler(lehrerSchülerAbmelden));
router.get('/getFaecherFromStudent/:id', userIsLoggedIn, asyncHandler(getFaecherFromStudent));

// ! _______________________________________________________________________________________________

//TESTROUTE UM ZU SCHAUEN OB DIE SESSION NOCH AN IST
router.get('/isSessionAktiv', (req, res) => res.send(req.session.aktiverUser));

export default router;
