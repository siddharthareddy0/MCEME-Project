import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import employeeRoutes from './routes/employeeRoutes.js';
import authRoutes from './routes/authRoutes.js';
import infoRoutes from './routes/infoRoutes.js';
import getEmployeeRoutes from './routes/getEmployeeRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import leaveRoutes from './routes/leaveRoutes.js';
import jwt from "jsonwebtoken";
import kinderedRollRoutes  from './routes/kinderedRollRoutes.js';
import retire from "./routes/retireRouter.js";
import signupRoute from './routes/signupRoute.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Allow only your frontend
    methods: "GET,POST,PUT,DELETE,PATCH", // Allow necessary methods
    credentials: true, // Allow cookies and authorization headers
  })
);
app.use(express.json());
app.use(cookieParser());

app.get('/api/login', (req, res) => {

  const token = req.cookies.jwt; // ✅ Ensure correct name

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "project112233");
    res.json({ role: decoded.role });
  } catch (error) {
    console.error("JWT Verification Error:", error.message); 
    res.status(403).json({ error: "Invalid token" });
  }
});



// ...existing code...

app.use('/kinderedroll', kinderedRollRoutes);

app.use("/api/employees", employeeRoutes); // Only admins can access
app.use("/info", infoRoutes); // Only users can access
app.use("/attendance", attendanceRoutes);
app.use("/leave", leaveRoutes);
app.use("/leave-history",leaveRoutes);
app.use("/retire", retire);
app.use("/api/auth", authRoutes);
app.use("/employeesAll", getEmployeeRoutes);
app.use('/api', signupRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
