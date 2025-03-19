import express from "express"
import { createEmployee}  from "../controllers/employeeController.js"
import { UpdateEmployee}  from "../controllers/updateEmployeeController.js"
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/emp',authMiddleware(['admin']), createEmployee);
router.post('/empUpdate/:id',authMiddleware(['admin']), UpdateEmployee);

export default router;
