import express from "express";
const router = express.Router();
import kinderedRollController from '../controllers/kinderedRollController.js';
import authMiddleware from "../middlewares/authMiddleware.js";

router.post('/submit', authMiddleware(['admin']), kinderedRollController.submitForm);
router.get('/records', authMiddleware(['admin','officer']), kinderedRollController.getRecords);
router.get('/records/:id', authMiddleware(['admin','officer']), kinderedRollController.getRecordById);
router.patch('/records/:id/status', authMiddleware(['admin','officer']), kinderedRollController.updateStatus);

export default router;
