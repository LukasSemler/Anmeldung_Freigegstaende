/* eslint-disable import/extensions */
import express from 'express';

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
  schuelerAbmelden,
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
router.post('/fachErstellen', fachErstellen);
router.post('/fachThumbnail', fachThumbnailSpeichern);
router.delete('/delFach/:id', fachDel);
router.get('/getFreifaecher', getFreifaecher);
router.patch('/changeFach/:id', changeFach);

// ! _______________________________________________________________________________________________

//* Routen für Schüler:
router.post('/SchuelerInFreifachAnmelden', SchuelerInFreifachAnmelden);
router.post('/SchuelerInFreifachAbmelden', SchuelerVonFreifachAbmelden);
router.get('/getFaecherSchueler/:id', getFaecherSchueler);
router.delete('/schuelerAbmelden/:id', schuelerAbmelden);

// ! _______________________________________________________________________________________________

// *Routen für Lehrer
router.get('/getFreifaecherLehrer', getFreifaecherLehrer);
router.patch('/accepDeclineStudent/:id', accepDeclineStudent);
router.get('/getSchuelerFaecher', getSchuelerFaecher);

// ! _______________________________________________________________________________________________

//* Routen für Admin
router.get('/getFaecherAdmin', getFaecherAdmin);
router.patch('/acceptFach/:id', acceptFach);

// ! _______________________________________________________________________________________________

//* Routen für Verwaltung
router.post('/setFristenChangeTimeLine', setFristenChangeTimeLine);
router.get('/getAdminTimeLine', getAdminTimeLine);
router.get('/getFristen', getFristen);
router.post('/lehrerSchuelerAnmelden', lehrerSchülerAnmelden);
router.get('/getFaecherFromStudent/:id', getFaecherFromStudent);

// ! _______________________________________________________________________________________________

//* Alte Routen
// router.get('/getAdminTimeLine', getAdminTimeLine);
// router.get('/getFristen', getFristen);
// router.get('/getFreifaecher', getFreifaecher);
// ? Wird nicht verwendet
// router.get('/getFreifaecherLehrer', getFreifaecherLehrer);

// router.get('/getFaecherAdmin', getFreifaecherAdmin);
// router.get('/getSchuelerFaecher', getSchuelerFaecher);

// router.post('/fachErstellen', fachErstellen);
// router.post('/fachThumbnail', fachThumbnail);
// router.post('/setFristenChangeTimeLine', setFristenChangeTimeLine);
// router.post('/lehrerSchuelerAnmelden', lehrerSchülerAnmelden);
// router.post('/SchuelerInFreifachAnmelden', SchuelerInFreifachAnmelden);
// router.post('/SchuelerInFreifachAbmelden', SchuelerInFreifachAbmelden);

// router.patch('/acceptFach/:id', acceptFach);
// router.patch('/adminChangeFach/:id', adminChangeFach);
// router.patch('/accepDeclineStudent/:id', accepDeclineStudent);

// router.delete('/delFach/:id', fachDel);

// router.get('/getFaecherSchueler/:id', getFaecherSchueler);

// router.delete('/schuelerAbmelden/:id', schuelerAbmelden);

// router.post('/changeTimeLine', changeTimeLine);

// router.get('/getFaecherFromStudent/:id', getFaecherFromStudent);
export default router;
