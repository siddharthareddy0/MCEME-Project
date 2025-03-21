import express from 'express';
const router = express.Router();
import retirementController  from '../controllers/retirecontroller.js';

router.get('/by-year', retirementController.getRetirementsByYear);

export default router;
