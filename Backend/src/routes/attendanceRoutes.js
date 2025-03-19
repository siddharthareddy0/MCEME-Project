import express from "express";
import attendanceController from "../controllers/attendanceController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/faculties",authMiddleware(['admin','user']), attendanceController.getFaculties);
router.get("/getAttendance",authMiddleware(['admin','user']), attendanceController.getAttendance);
router.get("/getMembers",authMiddleware(['admin','user']), attendanceController.getMembers);
router.get("/getData/:faculty",authMiddleware(['admin','user']), attendanceController.getData);
router.post("/submit",authMiddleware(['admin','user']), attendanceController.submit);
router.get("/check",authMiddleware(['admin','user']), attendanceController.check);

export default router;