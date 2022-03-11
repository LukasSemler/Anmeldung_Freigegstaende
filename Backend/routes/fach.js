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
} from '../controllers/Fach.js';

router.post('/fachErstellen', fachErstellen);
router.post('/fachThumbnail', fachThumbnail);

router.get('/getAdminTimeLine', getAdminTimeLine);
router.post('/setFristenChangeTimeLine', setFristenChangeTimeLine);
router.get('/getFristen', getFristen);

router.get('/getFreifaecher', getFreifaecher);

router.post('/lehrerSchuelerAnmelden', lehrerSchülerAnmelden);

export default router;
