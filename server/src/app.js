import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Ensure that the CORS origin is correctly set in your environment variables
    credentials: true, // Allow credentials to be sent with requests (like cookies or headers)
  })
);

app.use(express.urlencoded({ extended: true, limit: "20kb" })); // Handle URL-encoded data with a size limit
app.use(express.json({ limit: "20kb" })); // Handle JSON data with a size limit
app.use(express.static("public")); // Serve static files (e.g., photos, images)
app.use(cookieParser()); // Parse cookies



// importing route

import adminRouter from "./routes/admin.routes.js";
import Studentrouter from "./routes/student.routes.js";


//using routes
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/student", Studentrouter);

export default app;
