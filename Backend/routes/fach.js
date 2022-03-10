import express from 'express';
const router = express.Router();

import {
  fachErstellen,
  fachThumbnail,
  getAdminTimeLine,
  changeTimeLine,
  setFristen,
  getFristen,
} from '../controllers/Fach.js';

router.post('/fachErstellen', fachErstellen);
router.post('/fachThumbnail', fachThumbnail);

router.get('/getAdminTimeLine', getAdminTimeLine);
router.patch('/changeTimeLine', changeTimeLine);
router.post('/setFristen', setFristen);
router.get('/getFristen', getFristen);

export default router;
