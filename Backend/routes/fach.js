import express from 'express';
const router = express.Router();

import {
  fachErstellen,
  fachThumbnail,
  getAdminTimeLine,
  setFristenChangeTimeLine,
  getFristen,
  getFreifaecher,
  lehrerSchülerAnmelden,
  getFreifaecherAdmin,
  acceptFach,
  adminChangeFach,
  getSchuelerFaecher,
  accepDeclineStudent,
  fachDel,
  getFreifaecherLehrer,
  SchuelerInFreifachAnmelden,
  SchuelerInFreifachAbmelden,
  getFaecherSchueler,
  schuelerAbmelden,
  changeTimeLine,
  getFaecherFromStudent,
} from '../controllers/Fach.js';

router.get('/getAdminTimeLine', getAdminTimeLine);
router.get('/getFristen', getFristen);
router.get('/getFreifaecher', getFreifaecher);
router.get('/getFreifaecherLehrer', getFreifaecherLehrer);
router.get('/getFaecherAdmin', getFreifaecherAdmin);
router.get('/getSchuelerFaecher', getSchuelerFaecher);

router.post('/fachErstellen', fachErstellen);
router.post('/fachThumbnail', fachThumbnail);
router.post('/setFristenChangeTimeLine', setFristenChangeTimeLine);
router.post('/lehrerSchuelerAnmelden', lehrerSchülerAnmelden);
router.post('/SchuelerInFreifachAnmelden', SchuelerInFreifachAnmelden);
router.post('/SchuelerInFreifachAbmelden', SchuelerInFreifachAbmelden);

router.patch('/acceptFach/:id', acceptFach);
router.patch('/adminChangeFach/:id', adminChangeFach);
router.patch('/accepDeclineStudent/:id', accepDeclineStudent);

router.delete('/delFach/:id', fachDel);

router.get('/getFaecherSchueler/:id', getFaecherSchueler);

router.delete('/schuelerAbmelden/:id', schuelerAbmelden);

router.post('/changeTimeLine', changeTimeLine);

router.get('/getFaecherFromStudent/:id', getFaecherFromStudent);
export default router;
