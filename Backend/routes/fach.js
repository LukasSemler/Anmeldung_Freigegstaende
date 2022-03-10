import express from 'express';
const router = express.Router();

import { fachErstellen, fachThumbnail, getAdminTimeLine } from '../controllers/Fach.js';

router.post('/fachErstellen', fachErstellen);
router.post('/fachThumbnail', fachThumbnail);

router.get('/getAdminTimeLine', getAdminTimeLine);

export default router;
