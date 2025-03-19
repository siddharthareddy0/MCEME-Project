import express from "express";
import infoController from "../controllers/infoController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getEmployeeById } from "../controllers/getEmployeeController.js";

const router = express.Router();

router.get("/dept", infoController.getDepartments);
router.get("/trade", infoController.getTrade);
router.get("/employees",authMiddleware(['officer','admin']), infoController.getEmp);
router.get("/employeesFac",authMiddleware(['user']), infoController.getEmpFac);
router.get('/employees/:id', getEmployeeById);


export default router;
