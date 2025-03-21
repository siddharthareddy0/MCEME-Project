import express from 'express';
import signup from '../controllers/signupcontoller.js';
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post('/signup', signup.signup);
router.get('/pending-users', authMiddleware(['admin']), signup.getPendingUsers);
router.put('/update-user-status', authMiddleware(['admin']), signup.updateUserStatus);
router.get('/users', authMiddleware(['admin']), signup.getAllUsers);
router.delete('/delete-user/:username', authMiddleware(['admin']), signup.deleteUser);

export default router;
