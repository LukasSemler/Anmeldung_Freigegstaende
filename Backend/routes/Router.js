/* eslint-disable import/extensions */
import express from 'express';
import asyncHandler from 'express-async-handler';

import // fachErstellen,
// fachThumbnail,
// getAdminTimeLine,
// setFristenChangeTimeLine,
// getFristen,
// getFreifaecher,
// // lehrerSchülerAnmelden,
// getFreifaecherAdmin,
// acceptFach,
// adminChangeFach,
// getSchuelerFaecher,
// accepDeclineStudent,
// fachDel,
// getFreifaecherLehrer,
// SchuelerInFreifachAnmelden,
// SchuelerInFreifachAbmelden,
// getFaecherSchueler,
// schuelerAbmelden,
// changeTimeLine,
// getFaecherFromStudent,
'../controllers/Fach_alt.js';

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

const router = express.Router();

//* Routen für Fach:
router.post('/fachErstellen', asyncHandler(fachErstellen));
router.post('/fachThumbnail', asyncHandler(fachThumbnailSpeichern));
router.delete('/delFach/:id', asyncHandler(fachDel));
router.get('/getFreifaecher', asyncHandler(getFreifaecher));
router.patch('/changeFach/:id', asyncHandler(changeFach));

// ! _______________________________________________________________________________________________

//* Routen für Schüler:
router.post('/SchuelerInFreifachAnmelden', asyncHandler(SchuelerInFreifachAnmelden));
router.post('/SchuelerInFreifachAbmelden', asyncHandler(SchuelerVonFreifachAbmelden));
router.get('/getFaecherSchueler/:id', asyncHandler(getFaecherSchueler));

// ! _______________________________________________________________________________________________

// *Routen für Lehrer
router.get('/getFreifaecherLehrer', asyncHandler(getFreifaecherLehrer));
router.patch('/accepDeclineStudent/:id', asyncHandler(accepDeclineStudent));
router.get('/getSchuelerFaecher', asyncHandler(getSchuelerFaecher));

// ! _______________________________________________________________________________________________

//* Routen für Admin
router.get('/getFaecherAdmin', asyncHandler(getFaecherAdmin));
router.patch('/acceptFach/:id', asyncHandler(acceptFach));

// ! _______________________________________________________________________________________________

//* Routen für Verwaltung
router.post('/setFristenChangeTimeLine', asyncHandler(setFristenChangeTimeLine));
router.get('/getAdminTimeLine', asyncHandler(getAdminTimeLine));
router.get('/getFristen', asyncHandler(getFristen));
router.post('/lehrerSchuelerAnmelden', asyncHandler(lehrerSchülerAnmelden));
router.get('/getFaecherFromStudent/:id', asyncHandler(getFaecherFromStudent));

// ! _______________________________________________________________________________________________

export default router;
