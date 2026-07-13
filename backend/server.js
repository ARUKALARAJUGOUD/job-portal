import dotenv from "dotenv";
//used to access the .env files
dotenv.config();

import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import crypto from "crypto";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
// import xss from "xss-clean";
import { DataBase } from "./config/DataBase.js";

// Routes
import applicationRoutes from "./routes/application.route.js";
import companyRoutes from "./routes/company.route.js";
import jobRoutes from "./routes/job.route.js";
import resumeRoutes from "./routes/resume.route.js";
import savedJobRoutes from "./routes/savedJob.route.js";
import skillsRoutes from "./routes/skills.route.js";
import userRoutes from "./routes/user.route.js";
const app = express();

const secret = crypto.randomBytes(64).toString("hex");
console.log(secret);

//used in the cors
const corsData = {
  origin: ["http://localhost:5173"],
  credentials: true,
};

// connecting the frontend and backend using cors
app.use(cors(corsData));

//used for the brute-force attack  and api abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 100,
  max: 100,
});
app.use(limiter);

//used for the after deploy the website like to speed up the
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// used for the tracking the suspicious activity
app.use(morgan("combined"));

// protects from the secure cookie authentication ;
app.use(cookieParser());

// protects from the scripts that are used by the attackers
// app.use(xss());

// use for mongodb attackers
// app.use(mongoSanitize());

// used to prevent the attackers from the xss attackers , information leakage , mime sniffing ,click jacking
app.use(helmet());

// api's
// user
app.use("/api/v1/user", userRoutes);

// company
app.use("/api/v1/company", companyRoutes);

//job
app.use("/api/v1/job", jobRoutes);

// saved job
app.use("/api/v1/saved-job", savedJobRoutes);

// resume
app.use("/api/v1/resume", resumeRoutes);

// application
app.use("/api/v1/application", applicationRoutes);

// skills
app.use("/api/v1/skills", skillsRoutes);

//server is started
 DataBase();
app.listen(process.env.PORT, () => {
 

  console.log("server is running at the 5000 port ");
});
