import express from 'express';
const router = express.Router();

import { fachErstellen } from '../controllers/Fach.js';

router.post('/fachErstellen', fachErstellen);

export default router;
