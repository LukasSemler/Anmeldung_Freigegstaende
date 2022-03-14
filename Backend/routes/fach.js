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
} from '../controllers/Fach.js';

router.post('/fachErstellen', fachErstellen);
router.post('/fachThumbnail', fachThumbnail);

router.get('/getAdminTimeLine', getAdminTimeLine);
router.post('/setFristenChangeTimeLine', setFristenChangeTimeLine);
router.get('/getFristen', getFristen);

router.get('/getFreifaecher', getFreifaecher);

router.post('/lehrerSchuelerAnmelden', lehrerSchülerAnmelden);

router.get('/getFaecherAdmin', getFreifaecherAdmin);

router.patch('/acceptFach/:id', acceptFach);

router.patch('/adminChangeFach/:id', adminChangeFach);

export default router;
